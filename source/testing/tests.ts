///<reference path="../../typings/main.d.ts"/>
import {test} from "blue-tape";
const pass = Promise.resolve();

import tests from "../tests";

test("set", (test)=>{
    test.false(tests.set(undefined), "undefined");
    test.false(tests.set(null), "null");
    test.true(tests.set(false), "boolean");
    test.true(tests.set(0), "number");
    test.true(tests.set(""), "string");
    test.true(tests.set(Symbol()), "symbol");
    test.true(tests.set({}), "object");
    test.true(tests.set([]), "array");
    test.true(tests.set(new RegExp("")), "regex");
    return pass;
});

test("unset", (test)=>{
    test.true(tests.unset(undefined), "undefined");
    test.true(tests.unset(null), "null");
    test.false(tests.unset(false), "boolean");
    test.false(tests.unset(0), "number");
    test.false(tests.unset(""), "string");
    test.false(tests.unset(Symbol()), "symbol");
    test.false(tests.unset({}), "object");
    test.false(tests.unset([]), "array");
    test.false(tests.unset(new RegExp("")), "regex");
    return pass;
});



// TypeScript seems to need this, and I couldn't find a typings package for it *shrugs*.
declare var Symbol;