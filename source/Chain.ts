
//## The Chain class
export default class Chain {

    // **Properties:**

    // + **value:** All chain tests will be scrutinizing this value.
    value: any;

    // + **default:** The default value provided to the `else` method if the chain fails.
    defaultValue: any;

    // + **mode:** The boolean evaluation mode for each chained test result.
    //   - If one test in the chain fails, the whole chain fails (all must pass).
    //   - Only one test in the chain must pass, and the whole chain will pass (one must pass).
    mode: ChainMode;

    // + **passing:** Boolean, whether or not the chain is passing.
    //   - In `ChainMode.And`, passing is initially true (innocent until proven guilty).
    //   - In `ChainMode.Or`, passing is initially false (guilty until proven innocent).
    passing: boolean;

    // + **records:** Records of the outcome of each test performed on the chain. When the chain fails and throws the default error, these records are used to display which tests had failed.
    records: any[] = [];

    //### Chain constructor
    constructor(value: any, mode: ChainMode|string = ChainMode.And) {
        this.value = value;
        this.mode = (mode === ChainMode.And || mode === 'AND' || mode === 'and' || mode === '&&')
            ? ChainMode.And
            : ChainMode.Or;
        this.passing = (this.mode === ChainMode.And);
        this.records = [];
    }

    //#### Chain method: default
    // Set the default value which will be returned when the `else` chain method is used and the chain value is undefined.
    default(defaultValue) {
        this.defaultValue = defaultValue;
        return this;
    }

    //#### Chain method: else
    // *Chain terminator.* Implements functionality for default values, fallback values, and error handling.
    else(fallbackValue: any) {

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

    //#### Chain property (getter): result
    // *Chain terminator.* Gets the chain's current passing status.
    get result() { return this.passing; }
    getResult() { return this.passing; }
}

// **Chains can be instantiated under one of these modes:**
// - `ChainMode.And`, where every chain test must pass for a whole chain to pass.
// - `ChainMode.Or`, where only one chain test must pass for a whole chain to pass.
export enum ChainMode {
    And,
    Or
}

export function createTestingChainClass(tests: {[testName:string]:Function}, ChainClass = Chain): Chain {
    class C extends ChainClass {}

    // Every test is registered to the new chain class.
    for (const test in tests) register({
        testName: test,
        testFunction: tests[test],
        ChainClass: C
    });

    return <Chain> <any> function Cynic(value: any, mode: ChainMode|string = ChainMode.And) {
        return new C(value, mode);
    };
}

//## Register function
// Add tests to the chain class. Extensibility!
// There are two contexts in which the tests can be executed.
function register({testName, testFunction, ChainClass}) {

    //### Static context test implementation function.
    //     Cynic.number(8)   //> true
    //     Cynic.number('8') //> false
    ChainClass[testName] = function() {
        let {cleanArguments, inverted} = parseForInversion(arguments);
        let testResult = testFunction.apply(ChainClass, cleanArguments);
        if (inverted) testResult = !testResult;
        return testResult
    };

    //### Chain context test implementation function.
    //     Cynic(8).number().result   //> true
    //     Cynic('8').number().result //> false
    ChainClass.prototype[testName] = function() {
        let {cleanArguments, inverted} = parseForInversion(arguments);
        cleanArguments.unshift(this.value);

        let testResult = testFunction.apply(this, cleanArguments);

        // Performing inversion.
        if (inverted) testResult = !testResult;

        // Keeping record.
        this.records.push({
            testName, //----> String name of the test.
            testResult, //--> Boolean result of the test, after any inversion.
            inverted //-----> Whether or not the testResult had been inverted.
        });

        // Running boolean evaluation of test result.
        // + `MODE.AND`, all tests must pass.
        // + `MODE.OR`, one test must pass.
        this.passing = (this.mode === ChainMode.And)
            ? this.passing && testResult
            : this.passing || testResult; 

        return this;
    };
};

//## Inverter
// Pass this inverter as an argument to a Chain test, and the test result will invert.
export const inverter = new function Inverter() {}; //Symbol('inverter');

// Inverter parsing for test implementations.
function parseForInversion(args) {
    args = Array.prototype.slice.call(args); // Converting args to an array.
    return {
        cleanArguments: args.filter(arg => arg !== inverter), // Arguments array with inverters removed.
        inverted: args.some(arg => arg === inverter) // Boolean whether or not any inverters were found in the array.
    };
};
