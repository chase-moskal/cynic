#!/usr/bin/env node

import openUrl from "open"
import commander from "commander"
import {relative, join} from "path"

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {runNode} from "./internals/runners/run-node.js"
import {cynicTestFileName} from "./internals/constants.js"
import {runServer} from "./internals/runners/run-server.js"
import {dieOnError} from "./internals/toolbox/die-on-error.js"
import {runPuppeteer} from "./internals/runners/run-puppeteer.js"
import {parseBoolean} from "./internals/toolbox/parse-boolean.js"

dieOnError()

commander
	.arguments("<environment> <suitePath>")
	.option("-l, --label <string>", "name of the test suite", "test suite")
	.option("-o, --open <boolean>", "open the browser automatically", "false")
	.option("-p, --port <number>", "port to run puppeteer", "8021")
	.option("-O, --origin <string>", "url origin to test suite page", "http://localhost:8021")
	.option("-c, --cynic-path <string>", "path to cynic library root", "./node_modules/cynic")
	.parse(process.argv)

;(async() => {
	let {
		port,
		open,
		label,
		origin,
		cynicPath,
	} = commander
	let [environment, suitePath] = commander.args

	if (!environment)
		throw new Error(`1st argument 'environment' required`)

	if (!suitePath)
		throw new Error(`2nd argument 'suitePath' required`)

	port = parseInt(port)
	open = parseBoolean(open)
	environment = environment.toLowerCase()

	if (environment === "node") {
		const importCwd = dirname(fileURLToPath(import.meta.url))
		const absoluteSuite = join(process.cwd(), suitePath)
		const importPath = "./" + relative(
			importCwd,
			absoluteSuite
		)
		const {default: suite} = await import(importPath)
		await runNode(label, suite)
	}
	else if (environment === "browser") {
		runServer({
			port,
			label,
			suitePath,
			cynicPath,
		})
		const url = `${origin}/${cynicTestFileName}`
		console.log(`\n Test server running, see ${url}\n`)
		if (open) openUrl(url)
	}
	else if (environment === "puppeteer") {
		await runPuppeteer({
			port,
			label,
			origin,
			suitePath,
			cynicPath,
			launchOptions: open
				? {headless: false, devtools: true}
				: {headless: true, devtools: false},
		})
	}
	else throw new Error(`environment must be 'node', 'browser', or 'puppeteer'`)
})()
