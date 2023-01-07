
import {cli} from "@benev/argv"
import {RawArgs, RawParams} from "./types.js"

export function makeCommand() {
	return cli<RawArgs, RawParams>()({
		bin: "cynic",
		argv: process.argv,
		columns: process.stdout.columns,

		readme: "https://github.com/chase-moskal/cynic",
		help: "run a cynic test suite module",

		argorder: ["environment", "suite"],

		args: {
			environment: {
				type: String,
				mode: "requirement",
				help: `runtime to run tests under (can be "node", "browser", or "puppeteer")`,
			},
			suite: {
				type: String,
				mode: "requirement",
				help: `path to cynic test suite module (eg, "dist/suite.test.js")`,
			},
		},

		params: {
			"--label": {
				type: String,
				mode: "default",
				default: "test suite",
				help: `name of the test suite`,
			},
			"--open": {
				type: Boolean,
				mode: "option",
				help: `prompt open your default web browser`,
			},
			"--port": {
				type: Number,
				mode: "default",
				default: 8021,
				help: `port to run puppeteer`,
			},
			"--host": {
				type: String,
				mode: "default",
				default: "http://localhost",
				help: `url hostname to puppeteer server`,
			},
			"--cynic": {
				type: String,
				mode: "default",
				default: "node_modules/cynic",
				help: `path to cynic library root`,
			},
			"--importmap": {
				type: String,
				mode: "option",
				help: `path to your own import map`,
			},
		},
	})
}
