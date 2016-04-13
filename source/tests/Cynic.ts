
///<reference path="../../typings/main.d.ts"/>
import {test} from "blue-tape";
import Cynic, {invert as inv} from "../Cynic";
declare var Symbol;

const pass = Promise.resolve();

test("static context", test => {
    test.true(Cynic.set(true), "set test works statically");
    return pass;
});

test("chainable context", test => {
    test.true(new Cynic(true).set().result, "set test works on the chain");
    return pass;
});

test("inverter", test => {
    test.false(new Cynic(true).set(inv).result, "inversion works on chained tests");
    return pass;
});

test("test: set", test => {
    test.false(Cynic.set(undefined), "undefined is not set");
    test.false(Cynic.set(null), "null is not set");
    test.true(Cynic.set(false), "boolean is set");
    test.true(Cynic.set(0), "number is set");
    test.true(Cynic.set(""), "string is set");
    test.true(Cynic.set(Symbol()), "symbol is set");
    test.true(Cynic.set({}), "object is set");
    test.true(Cynic.set([]), "array is set");
    test.true(Cynic.set(new RegExp("")), "regex is set");
    return pass;
});

test("test: unset", test => {
    test.true(Cynic.unset(undefined), "undefined is unset");
    test.true(Cynic.unset(null), "null is unset");
    test.false(Cynic.unset(false), "boolean is not unset");
    test.false(Cynic.unset(0), "number is not unset");
    test.false(Cynic.unset(""), "string is not unset");
    test.false(Cynic.unset(Symbol()), "symbol is not unset");
    test.false(Cynic.unset({}), "object is not unset");
    test.false(Cynic.unset([]), "array is not unset");
    test.false(Cynic.unset(new RegExp("")), "regex is not unset");
    return pass;
});

test("test: undefined", test => {
    test.true(Cynic.undefined(undefined), "undefined is undefined");
    test.false(Cynic.undefined(null), "null is not undefined");
    test.false(Cynic.undefined(false), "boolean is not undefined");
    test.false(Cynic.undefined(0), "number is not undefined");
    test.false(Cynic.undefined(""), "string is not undefined");
    test.false(Cynic.undefined(Symbol()), "symbol is not undefined");
    test.false(Cynic.undefined({}), "object is not undefined");
    test.false(Cynic.undefined([]), "array is not undefined");
    test.false(Cynic.undefined(new RegExp("")), "regex is not undefined");
    return pass;
});

test("test: defined", test => {
    test.false(Cynic.defined(undefined), "undefined is not defined");
    test.true(Cynic.defined(null), "null is defined");
    test.true(Cynic.defined(false), "boolean is defined");
    test.true(Cynic.defined(0), "number is defined");
    test.true(Cynic.defined(""), "string is defined");
    test.true(Cynic.defined(Symbol()), "symbol is defined");
    test.true(Cynic.defined({}), "object is defined");
    test.true(Cynic.defined([]), "array is defined");
    test.true(Cynic.defined(new RegExp("")), "regex is defined");
    return pass;
});

test("test: null", test => {
    test.false(Cynic.null(undefined), "undefined is not null");
    test.true(Cynic.null(null), "null is null");
    test.false(Cynic.null(0), "number is not null");
    test.false(Cynic.null(false), "boolean is not null");
    test.false(Cynic.null(""), "string is not null");
    test.false(Cynic.null(Symbol()), "symbol is not null");
    test.false(Cynic.null({}), "object is not null");
    test.false(Cynic.null([]), "array is not null");
    test.false(Cynic.null(new RegExp("")), "regex is not null");
    return pass;
});

test("test: boolean", test => {
    test.false(Cynic.boolean(undefined), "undefined is not a boolean");
    test.false(Cynic.boolean(null), "null is not a boolean");
    test.true(Cynic.boolean(false), "boolean is boolean");
    test.false(Cynic.boolean(0), "number is not boolean");
    test.false(Cynic.boolean(""), "string is not boolean");
    test.false(Cynic.boolean(Symbol()), "symbol is not boolean");
    test.false(Cynic.boolean({}), "object is not boolean");
    test.false(Cynic.boolean([]), "array is not boolean");
    test.false(Cynic.boolean(new RegExp("")), "regex is not boolean");
    return pass;
});
