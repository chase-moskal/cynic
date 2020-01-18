
import {test} from "../../cynic.js"
import {suite} from "./cynic.test.js"

;(async() => {
	const {report, failed} = await test("cynic node tests", suite)

	console.log(report)
	console.log(failed === 0 ? "*PASSING*" : "*FAILING*")

	const pre = document.createElement("pre")
	pre.className = "report"
	pre.textContent = report
	document.body.appendChild(pre)

	if (failed > 0) {
		const pre2 = document.createElement("pre")
		pre2.className = "failed"
		document.body.appendChild(pre2)
	}
})()
