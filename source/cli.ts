#!/usr/bin/env node

import {makeCommand} from "./command.js"
import {dieOnError} from "./internals/toolbox/die-on-error.js"
import {executeNodeTesting} from "./internals/execute-node-testing.js"
import {executeBrowserTesting} from "./internals/execute-browser-testing.js"
import {executePuppeteerTesting} from "./internals/execute-puppeteer-testing.js"

dieOnError()

const {args, params} = makeCommand()
const details = {...args, ...params}

switch (args.environment) {

	case "node":
		await executeNodeTesting(details)

	case "browser":
		await executeBrowserTesting(details)

	case "puppeteer":
		await executePuppeteerTesting(details)

	default:
		throw new Error(`invalid environment "${args.environment}", expected "node", "browser", or "puppeteer"`)
}
