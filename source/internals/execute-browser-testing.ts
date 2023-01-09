
import openUrl from "open"
import {Details} from "../types.js"
import {cynicTestFileName} from "./constants.js"
import {runServer} from "./runners/run-server.js"

export async function executeBrowserTesting(d: Details) {

	runServer(d)

	const url = `${d["--host"]}:${d["--port"]}/${cynicTestFileName}`
	console.log(`\n Test server running, see ${url}\n`)

	if (d["--open"]) {
		console.log(" - prompting open web browser")
		openUrl(url)
	}
}
