
import * as http from "http"
import handler from "serve-handler"

import {cynicTestFileName} from "../constants.js"
import {escapeHtml} from "../toolbox/html-escape.js"

export function runServer({
	port,
	label,
	suitePath,
	cynicPath,
}: {
	port: number
	label: string
	suitePath: string
	cynicPath: string
}) {
	const server = http.createServer((request, response) => {
		const regex = new RegExp(`\/${cynicTestFileName}(?:|\.html)`, "i")
		if (regex.test(request.url)) {
			const html = makeTestingPage({suitePath, label, cynicPath})
			response.writeHead(200, {"Content-Type": "text/html"})
			response.write(html)
			response.end()
		}
		else {
			handler(request, response)
		}
	})
	server.listen(port)
	return server
}

const makeTestingPage = ({suitePath, label, cynicPath}: {
	label: string
	suitePath: string
	cynicPath: string
}) => `
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>${escapeHtml(label)}</title>
			<script async defer type="module">

				import {runBrowser}
					from "./${cynicPath}/dist/internals/runners/run-browser.js"

				import suite from "./${suitePath}"

				runBrowser(${JSON.stringify(label)}, suite)

			</script>
		</head>
	</html>
`
