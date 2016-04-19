
import Chain, {ChainMode, invert } from "./Chain";
import tests from "./tests";
export {Chain, ChainMode, invert };
declare var Symbol;

export default class Cynic extends Chain {
    static set(value, invert?) { return Cynic.test(tests.set, arguments) }
    static unset(value, invert?) { return Cynic.test(tests.unset, arguments) }
    static undefined(value, invert?) { return Cynic.test(tests.undefined, arguments) }
    static defined(value, invert?) { return Cynic.test(tests.defined, arguments) }
    static null(value, invert?) { return Cynic.test(tests.null, arguments) }
    static boolean(value, invert?) { return Cynic.test(tests.boolean, arguments) }
    static truthy(value, invert?) { return Cynic.test(tests.truthy, arguments) }
    static falsey(value, invert?) { return Cynic.test(tests.falsey, arguments) }
    static number(value, invert?) { return Cynic.test(tests.number, arguments) }
    static integer(value, invert?) { return Cynic.test(tests.integer, arguments) }
    static string(value, invert?) { return Cynic.test(tests.string, arguments) }
    static symbol(value, invert?) { return Cynic.test(tests.symbol, arguments) }
    static object(value, invert?) { return Cynic.test(tests.object, arguments) }
    static plainObject(value, invert?) { return Cynic.test(tests.plainObject, arguments) }
    static function(value, invert?) { return Cynic.test(tests.function, arguments) }
    static array(value, invert?) { return Cynic.test(tests.array, arguments) }
    static arrayLike(value, invert?) { return Cynic.test(tests.arrayLike, arguments) }
    static regex(value, invert?) { return Cynic.test(tests.regex, arguments) }
    static contains(haystack, needle, invert?) { return Cynic.test(tests.contains, arguments) }
    static in(haystack, needle:string, invert?) { return Cynic.test(tests.in, arguments) }
    static matches(subject:string, regex:RegExp, handler = (captures => captures !== null), invert?) { return Cynic.test(tests.matches, arguments) }
    static is(a, b, invert?) { return this.test(tests.is, arguments) }
    static isnt(a, b, invert?) { return this.test(tests.isnt, arguments) }
    static greater(x:number, y:number, invert?) { return this.test(tests.greater, arguments) }
    static less(x:number, y:number, invert?) { return this.test(tests.less, arguments) }
    static sameOrGreater(x:number, y:number, invert?) { return this.test(tests.sameOrGreater, arguments) }
    static sameOrLess(x:number, y:number, invert?) { return this.test(tests.sameOrLess, arguments) }
    static between(insider:number, x:number, y:number, invert?) { return this.test(tests.between, arguments) }
    static outside(outsider:number, x:number, y:number, invert?) { return this.test(tests.outside, arguments) }
    static empty(container:any[]|Object|string, invert?) { return this.test(tests.empty, arguments) }

    set(invert?) { return this.test("set", tests.set, arguments) }
    unset(invert?) { return this.test("unset", tests.unset, arguments) }
    undefined(invert?) { return this.test("undefined", tests.undefined, arguments) }
    defined(invert?) { return this.test("defined", tests.defined, arguments) }
    null(invert?) { return this.test("null", tests.null, arguments) }
    boolean(invert?) { return this.test("boolean", tests.boolean, arguments) }
    truthy(invert?) { return this.test("truthy", tests.truthy, arguments) }
    falsey(invert?) { return this.test("falsey", tests.falsey, arguments) }
    number(invert?) { return this.test("number", tests.number, arguments) }
    integer(invert?) { return this.test("integer", tests.integer, arguments) }
    string(invert?) { return this.test("string", tests.string, arguments) }
    symbol(invert?) { return this.test("symbol", tests.symbol, arguments) }
    object(invert?) { return this.test("object", tests.object, arguments) }
    plainObject(invert?) { return this.test("plainObject", tests.plainObject, arguments) }
    function(invert?) { return this.test("function", tests.function, arguments) }
    array(invert?) { return this.test("array", tests.array, arguments) }
    arrayLike(invert?) { return this.test("arrayLike", tests.arrayLike, arguments) }
    regex(invert?) { return this.test("regex", tests.regex, arguments) }
    contains(needle, invert?) { return this.test("contains", tests.contains, arguments) }
    in(needle:string, invert?) { return this.test("in", tests.in, arguments) }
    matches(regex: RegExp, handler = (captures => captures !== null), invert?) { return this.test("matches", tests.matches, arguments) }
    is(b, invert?) { return this.test("is", tests.is, arguments) }
    isnt(b, invert?) { return this.test("isnt", tests.isnt, arguments) }
    greater(y:number, invert?) { return this.test("greater", tests.greater, arguments) }
    less(y:number, invert?) { return this.test("less", tests.less, arguments) }
    sameOrGreater(y:number, invert?) { return this.test("sameOrGreater", tests.sameOrGreater, arguments) }
    sameOrLess(y:number, invert?) { return this.test("sameOrLess", tests.sameOrLess, arguments) }
    between(x:number, y:number, invert?) { return this.test("between", tests.between, arguments) }
    outside(x:number, y:number, invert?) { return this.test("outside", tests.outside, arguments) }
    empty(invert?) { return this.test("empty", tests.empty, arguments) }
}
