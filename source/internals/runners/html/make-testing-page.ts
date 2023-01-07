
import {Details} from "../../../types.js"
import {escapeHtml} from "./escape-html.js"
import {noop as html} from "../../toolbox/template-noop.js"

export const makeTestingPage = ({
		suite,
		"--label": label,
		"--cynic": cynic,
		"--importmap": importmap,
	}: Details) => html`

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
						"cynic/": "./${cynic}/",
						"cynic": "./${cynic}/dist/cynic.js"
					}
				}
			</script>
			${importmap
				? html`<script type="importmap-shim" src="${importmap}"></script>`
				: ""}
			<script async defer type="module-shim"></script>
			<script async defer src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.wasm.js"></script>

			<script async defer type="module-shim">
				import {runBrowser} from "./${cynic}/dist/internals/runners/run-browser.js"
				import suite from "./${suite}"
				runBrowser(${JSON.stringify(label)}, suite)
			</script>
		</head>
	</html>
`
