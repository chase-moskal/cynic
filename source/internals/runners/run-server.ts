
import * as http from "http"
import handler from "serve-handler"

import {cynicTestFileName} from "../constants.js"
import {escapeHtml} from "../toolbox/html-escape.js"

export function runServer({
	port,
	label,
	suitePath,
	cynicPath,
	importmapPath,
}: {
	port: number
	label: string
	suitePath: string
	cynicPath: string
	importmapPath?: string
}) {
	const server = http.createServer((request, response) => {
		const regex = new RegExp(`\/${cynicTestFileName}(?:|\.html)`, "i")
		if (regex.test(request.url)) {
			const html = makeTestingPage({suitePath, label, cynicPath, importmapPath})
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

const makeTestingPage = ({suitePath, label, cynicPath, importmapPath}: {
	label: string
	suitePath: string
	cynicPath: string
	importmapPath?: string
}) => `
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>${escapeHtml(label)}</title>
			<style>
				html, body {
					color: #89a76f;
					background: #111;
				}
			</style>

			<script type="importmap-shim">
				{
					"imports": {
						"cynic/": "./${cynicPath}/",
						"cynic": "./${cynicPath}/dist/cynic.js"
					}
				}
			</script>
			${importmapPath ? `<script type="importmap-shim" src="${importmapPath}"></script>` : ""}
			<script async defer type="module-shim"></script>
			<script async defer src="https://unpkg.com/es-module-shims@0.6.0/dist/es-module-shims.js"></script>

			<script async defer type="module-shim">
				import {runBrowser} from "./${cynicPath}/dist/internals/runners/run-browser.js"
				import suite from "./${suitePath}"
				runBrowser(${JSON.stringify(label)}, suite)
			</script>
		</head>
	</html>
`
