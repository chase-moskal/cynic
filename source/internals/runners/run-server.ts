
import * as http from "http"
import handler from "serve-handler"
import {Details} from "../../types.js"

import {cynicTestFileName} from "../constants.js"
import {makeTestingPage} from "./html/make-testing-page.js"

export function runServer(details: Details) {

	const server = http.createServer((request, response) => {
		const regex = new RegExp(`\/${cynicTestFileName}(?:|\.html)`, "i")

		if (regex.test(request.url!)) {
			console.log("HIT", request.url)
			const html = makeTestingPage(details)
			response.writeHead(200, {"Content-Type": "text/html"})
			response.write(html)
			response.end()
		}
		else {
			console.log("MISS", request.url)
			handler(request, response)
		}
	})

	server.listen(details["--port"])
	return server
}
