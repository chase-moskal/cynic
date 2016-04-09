
//======================
//:::: Tests object ::::
//======================
 // All tests must be placed on this object (rather than exported directly) in order to avoid name collisions with JavaScript reserved words.

var tests: any = {};
export default tests;


//===========================
//:::: Fundamental tests ::::
//===========================

tests.set   = o => o !== undefined && o !== null;
tests.unset = o => o === undefined || o === null;


//=========================
//:::: Primitive tests ::::
//=========================
 // ECMAScript defines six primitive data types.

// Undefined
tests.undefined = o => o === undefined;
tests.defined   = o => o !== undefined;

// Null
tests.null = o => o === null;

// Boolean
tests.boolean = o => tests.unset(o) || o.constructor === Boolean;
tests.truthy  = o => !!o;
tests.falsey  = o => !o;

// Number
tests.number  = o => tests.unset(o) || o.constructor === Number;
tests.integer = o => tests.unset(o) || (tests.num(o) && o%1 === 0);

// String
tests.string = o => tests.unset(o) || o.constructor === String;

// Symbol
tests.symbol = o => tests.unset(o) || o.constructor === Symbol;


//======================
//:::: Object tests ::::
//======================
 // The seventh non-primitive data type.

// Fundamental object tests.
tests.object      = o => tests.unset(o) || (o instanceof Object || typeof o == 'object');
tests.plainObject = o => tests.unset(o) || o.constructor === Object;
tests.has = (haystack, needle) => needle !== undefined ? needle in haystack : !tests.empty(haystack);

// Function.
tests.function = o => tests.unset(o) || o.constructor === Function;

// Array.
tests.array     = o => tests.unset(o) || o.constructor === Array;
tests.arrayLike = o => tests.unset(o) || (tests.set(o.length) && tests.number(o.length));
tests.contains  = (haystack, needle) => Array.prototype.indexOf.call(haystack, needle) !== -1;

// Regular expression.
tests.regex   = o => tests.unset(o) || o.constructor === RegExp;
tests.matches = (string, regex, handler = (captures => captures !== null)) => 
    (tests.set(string) && tests.string(string))
    && (tests.set(regex) && tests.regex(regex))
    && (tests.set(handler) && tests.function(handler))
    && !!handler(string.match(regex));


//=====================
//:::: Comparisons ::::
//=====================

// Fundamental comparisons.
tests.is   = (a, b) => a === b;
tests.isnt = (a, b) => a !== b;

// Numerical comparisons.
tests.greater       = (x, y) => x > y;
tests.less          = (x, y) => x < y;
tests.sameOrGreater = (x, y) => x >= y;
tests.sameOrLess    = (x, y) => x <= y;
tests.between = (insider, x, y) => x < insider && insider < y;
tests.outside = (outsider, x, y) => outsider < x && y < outsider;


//=====================
//:::: Fancy tests ::::
//=====================

// Check if an object, array-like, or string is empty (has no contents).
tests.empty = container => {

    // An empty object looks something like this: {}
    if (tests.arrayLike(container)) return container.length === 0;

    // An empty array looks something like this: []
    else if (tests.object(container)) return Object.keys(container).length === 0;

    // An empty string looks exactly like this: ""
    else if (tests.string(container)) return container === "";

    else throw new Error(`Unknown container type given to the 'empty' test (which only works on objects, arrayLikes, or strings).`);
};

// Not empty.
tests.occupied = container => !tests.empty(container);

// The meta test (the 'test' test).
tests.test = (value, test) => {
    if (!tests.function(test)) throw new Error(`Custom tests must be functions.`);
    return test(value);
};



// TypeScript seems to need this, and I couldn't find a typings package for it *shrugs*.
declare var Symbol;
