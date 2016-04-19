
// The Chain class
export default class Chain {

    // All chain tests will be scrutinizing this value.
    private value: any;

    // Default value provided to the `else` method if the chain fails.
    private defaultValue: any;

    // Evaluation mode for each chained test result.
    //   - If one test in the chain fails, the whole chain fails (all must pass).
    //   - Only one test in the chain must pass, and the whole chain will pass (one must pass).
    private mode: ChainMode;

    // Whether or not the chain is passing.
    //   - In `ChainMode.And`, passing is initially true (innocent until proven guilty).
    //   - In `ChainMode.Or`, passing is initially false (guilty until proven innocent).
    private passing: boolean;

    // Records of the outcome of each test performed on the chain. When the chain fails and throws the default error, these records are used to display which tests had failed.
    private records: {testName:string; testResult:boolean; inverted:boolean}[] = [];

    // Chain constructor
    constructor(value:any, mode:ChainMode|string = ChainMode.And) {
        this.value = value;
        this.mode = (mode === ChainMode.And || mode === 'AND' || mode === 'and' || mode === '&&')
            ? ChainMode.And
            : ChainMode.Or;
        this.passing = (this.mode === ChainMode.And);
        this.records = [];
    }

    // Check arguments for whether an inverter is present, and get back a clean 'inverter-free' version of the arguments.
    private static parseForInversion(args:IArguments|any[]): {inverted:boolean; cleanArgs:any[]} {

        // Convert args to an array.
        const params: any[] = args ? [].slice.call(args) : [];

        return {
            // Determine if an inverter is present in args.
            inverted: params.some(param => param === invert),

            // Filter out the inverter.
            cleanArgs: params.filter(param => param !== invert)
        };
    }

    // Run a test statically.
    static test(testFunction:Function, args?:IArguments|any[]): boolean {

        // Parse the arguments for inversion (cleanArgs that comes back has any inverter removed).
        const {inverted, cleanArgs} = Chain.parseForInversion(args);

        // Run the test.
        let testResult: boolean = testFunction.apply(this, cleanArgs);

        // Apply inversion.
        if (inverted) testResult = !testResult;

        // Return the test result.
        return testResult;
    }

    // Run a test on the chain.
    test(testName:string, test:Function, args?:IArguments|any[]) {

        // Parse the arguments for inversion.
        const {inverted, cleanArgs} = Chain.parseForInversion(args);

        // Prepend value into the clean arguments array.
        cleanArgs.unshift(this.value);

        // Run the test.
        let testResult: boolean = test.apply(this, cleanArgs);

        // Apply inversion to the test result.
        if (inverted) testResult = !testResult;

        // Keep records.
        this.records.push({testName, testResult, inverted});

        // Determine the passing state of the chain.
        this.passing = (this.mode === ChainMode.And)
            ? this.passing && testResult // All tests must pass.
            : this.passing || testResult; // Only one test needs to pass.

        // Returning the chain reference -- making the chain chainable :)
        return this;
    }

    // Chain method: default
    // Set the default value which will be returned when the `else` chain method is used and the chain value is undefined.
    default(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }

    // Chain method: else
    // Chain terminator. Implements functionality for default values, fallback values, and error handling.
    else(fallbackValue:any) {

        // If the *value* is undefined while the *default* is defined, the *default* is returned.
        if ((this.value === undefined) && (this.defaultValue !== undefined))
            return this.defaultValue;

        // If the chain is passing, the original value is returned.
        if (this.passing) return this.value;

        // If the chain fails, some considerations are made:
        else {

            // - If no fallback value was defined, a `CynicChainFailure` error is thrown.
            // The error includes debugging info about the chain failure, based on the `records` internal property.
            if (fallbackValue === undefined) {
                let error = new Error();
                error.name = 'CynicChainFailure';

                let failedTests = this.records
                    .filter(record => record.testResult === false) // Filtering out successful records.
                    .map(record => (record.inverted ? '!' : '') + record.testName); // Returning test names while prefixing "!" for inverted tests.
                error.message = `Cynic chain failed ${failedTests.length} test${failedTests.length===1?'':'s'}: [${failedTests.join(', ')}]`;

                throw error;
            }

            // - If an Error was provided as the fallback value, it is thrown.
            else if (fallbackValue instanceof Error) throw fallbackValue;

            // - If neither of the above, the fallback value is returned.
            else return fallbackValue;
        }
    }

    // Chain property (getter): result
    // *Chain terminator.* Gets the chain's current passing status.
    get result() { return this.passing }
    getResult() { return this.passing }
}

// Invert
// Pass this inverter as an argument to a Chain test, and the test result will be inverted.
export function Invert() {}
export const invert = new Invert // Symbol("invert")

// Chains can be instantiated under one of these modes:
//   - `ChainMode.And`, where every chain test must pass for a whole chain to pass.
//   - `ChainMode.Or`, where only one chain test must pass for a whole chain to pass.
export enum ChainMode {
    And,
    Or
}
