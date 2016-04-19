
import {Test} from "tape";
import {test} from "blue-tape";
import Cynic, {invert as inv} from "../Cynic";
declare var Symbol;
const pass = Promise.resolve();

test("==== Cynic.test.ts ====", () => pass);

// All of these tests should probably be moved to Chain.test.ts...

test("static context", test => {
    test.true(Cynic.set(true), "'set' test works statically");
    return pass;
});

test("chainable context", test => {
    test.true(new Cynic(true).set().result, "'set' test works on the chain");
    return pass;
});

test("inverter", test => {
    test.false(Cynic.set(true, inv), "inversion works on static tests");
    test.false(new Cynic(true).set(inv).result, "inversion works on chained tests");
    return pass;
});
