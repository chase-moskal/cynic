
import Chain, {ChainMode, invert } from "./Chain";
export {Chain, ChainMode, invert };
declare var Symbol;

export default class Cynic extends Chain {
    static set = (value) => value !== undefined && value !== null;
    static unset = (value) => value === undefined || value === null;
    static undefined = (value) => value === undefined;
    static defined = (value) => value !== undefined;
    static null = (value) => value === null;
    static truthy = (value) => !!value;
    static falsey = (value) => !value;
    static boolean = (value) => Cynic.set(value) && value.constructor === Boolean;
    static number = (value) => Cynic.set(value) && value.constructor === Number;
    static integer = (value) => Cynic.set(value) && (Cynic.number(value) && value%1 === 0);
    static string = (value) => Cynic.set(value) && value.constructor === String;
    static symbol = (value) => Cynic.set(value) && value.constructor === Symbol;
    static object = (value) => Cynic.set(value) && (value instanceof Object || typeof value == 'object');
    static plainObject = (value) => Cynic.set(value) && value.constructor === Object;
    static function = (value) => Cynic.set(value) && value.constructor === Function;
    static array = (value) => Cynic.set(value) && value.constructor === Array;
    static arrayLike = (value) => Cynic.set(value) && (Cynic.set(value.length) && Cynic.number(value.length));
    static regex = (value) => Cynic.set(value) && value.constructor === RegExp;
    static contains = (haystack, needle) => Array.prototype.indexOf.call(haystack, needle) !== -1;
    static in = (haystack, needle) => needle !== undefined ? needle in haystack : false;
    static matches = (subject: string, regex: RegExp, handler = (captures => captures !== null)) =>
        (Cynic.set(subject) && Cynic.string(subject))
        && (Cynic.set(regex) && Cynic.regex(regex))
        && (Cynic.set(handler) && Cynic.function(handler))
        && !!handler(subject.match(regex));
    static is = (a, b) => a === b;
    static isnt = (a, b) => a !== b;
    static greater = (x:number, y:number) => x > y;
    static less = (x:number, y:number) => x < y;
    static sameOrGreater = (x:number, y:number) => x >= y;
    static sameOrLess = (x:number, y:number) => x <= y;
    static between = (insider:number, x:number, y:number) => x < insider && insider < y;
    static outside = (outsider:number, x:number, y:number) => outsider < x && y < outsider;

    // Check if an object, array-like, or string is empty (has no contents).
    static empty = (container: any[]|Object|string) => {
        if (Cynic.arrayLike(container)) return (<any[]>container).length === 0; // An empty array looks something like this: [], and has zero length.
        else if (Cynic.object(container)) return Object.keys(container).length === 0; // An empty object looks something like this: {}, and has zero keys.
        else if (Cynic.string(container)) return container === ""; // An empty string looks exactly like this: "", and that's it.
        else throw `Unknown container type given to the 'empty' test (which only works on objects, arrayLikes, or strings).`;
    };

    set(invert?) { return this.test("set", Cynic.set, arguments) }
    unset(invert?) { return this.test("unset", Cynic.unset.apply(this, arguments)) }
    undefined(invert?) { return this.test("undefined", Cynic.undefined.apply(this, arguments)) }
    defined(invert?) { return this.test("defined", Cynic.defined, arguments) }
    null(invert?) { return this.test("null", Cynic.null, arguments) }
    boolean(invert?) { return this.test("boolean", Cynic.boolean, arguments) }
    truthy(invert?) { return this.test("truthy", Cynic.truthy, arguments) }
    falsey(invert?) { return this.test("falsey", Cynic.falsey, arguments) }
    number(invert?) { return this.test("number", Cynic.number, arguments) }
    integer(invert?) { return this.test("integer", Cynic.integer, arguments) }
    string(invert?) { return this.test("string", Cynic.string, arguments) }
    symbol(invert?) { return this.test("symbol", Cynic.symbol, arguments) }
    object(invert?) { return this.test("object", Cynic.object, arguments) }
    plainObject(invert?) { return this.test("plainObject", Cynic.plainObject, arguments) }
    function(invert?) { return this.test("function", Cynic.function, arguments) }
    array(invert?) { return this.test("array", Cynic.array, arguments) }
    arrayLike(invert?) { return this.test("arrayLike", Cynic.arrayLike, arguments) }
    regex(invert?) { return this.test("regex", Cynic.regex, arguments) }
    contains(needle, invert?) { return this.test("contains", Cynic.contains, arguments) }
    in(needle:string, invert?) { return this.test("in", Cynic.in, arguments) }
    matches(regex: RegExp, handler = (captures => captures !== null), invert?) { return this.test("matches", Cynic.matches, arguments) }
    is(b, invert?) { return this.test("is", Cynic.is, arguments) }
    isnt(b, invert?) { return this.test("isnt", Cynic.isnt, arguments) }
    greater(y:number, invert?) { return this.test("greater", Cynic.greater, arguments) }
    less(y:number, invert?) { return this.test("less", Cynic.less, arguments) }
    sameOrGreater(y:number, invert?) { return this.test("sameOrGreater", Cynic.sameOrGreater, arguments) }
    sameOrLess(y:number, invert?) { return this.test("sameOrLess", Cynic.sameOrLess, arguments) }
    between(x:number, y:number, invert?) { return this.test("between", Cynic.between, arguments) }
    outside(x:number, y:number, invert?) { return this.test("outside", Cynic.outside, arguments) }
    empty(invert?) { return this.test("empty", Cynic.empty, arguments) }
}
