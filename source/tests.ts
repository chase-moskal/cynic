
declare var Symbol;

const tests = {
    set: (value) => value !== undefined && value !== null,
    unset: (value) => value === undefined || value === null,
    undefined: (value) => value === undefined,
    defined: (value) => value !== undefined,
    null: (value) => value === null,
    truthy: (value) => !!value,
    falsey: (value) => !value,
    boolean: (value) => tests.set(value) && value.constructor === Boolean,
    number: (value) => tests.set(value) && value.constructor === Number,
    integer: (value) => tests.set(value) && (tests.number(value) && value%1 === 0),
    string: (value) => tests.set(value) && value.constructor === String,
    symbol: (value) => tests.set(value) && value.constructor === Symbol,
    object: (value) => tests.set(value) && (value instanceof Object || typeof value == 'object'),
    plainObject: (value) => tests.set(value) && value.constructor === Object,
    function: (value) => tests.set(value) && value.constructor === Function,
    array: (value) => tests.set(value) && value.constructor === Array,
    arrayLike: (value) => tests.set(value) && (tests.set(value.length) && tests.number(value.length)),
    regex: (value) => tests.set(value) && value.constructor === RegExp,
    contains: (haystack, needle) => Array.prototype.indexOf.call(haystack, needle) !== -1,
    in: (haystack, needle) => needle !== undefined ? needle in haystack : false,
    matches: (subject: string, regex: RegExp, handler = (captures => captures !== null)) =>
        (tests.set(subject) && tests.string(subject))
        && (tests.set(regex) && tests.regex(regex))
        && (tests.set(handler) && tests.function(handler))
        && !!handler(subject.match(regex)),
    is: (a, b) => a === b,
    isnt: (a, b) => a !== b,
    greater: (x:number, y:number) => x > y,
    less: (x:number, y:number) => x < y,
    sameOrGreater: (x:number, y:number) => x >= y,
    sameOrLess: (x:number, y:number) => x <= y,
    between: (insider:number, x:number, y:number) => x < insider && insider < y,
    outside: (outsider:number, x:number, y:number) => outsider < x && y < outsider,

    // Check if an object, array-like, or string is empty (has no contents).
    empty: (container: any[]|Object|string) => {
        if (tests.arrayLike(container)) return (<any[]>container).length === 0; // An empty array looks something like this: [], and has zero length.
        else if (tests.object(container)) return Object.keys(container).length === 0; // An empty object looks something like this: {}, and has zero keys.
        else if (tests.string(container)) return container === ""; // An empty string looks exactly like this: "", and that's it.
        else throw `Unknown container type given to the 'empty' test (which only works on objects, arrayLikes, or strings).`;
    }
};

export default tests;
