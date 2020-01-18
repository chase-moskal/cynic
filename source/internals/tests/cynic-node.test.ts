
import {test} from "../../cynic.js"
import {suite} from "./cynic.test.js"

;(async() => {
	const {report, failed} = await test("cynic browser tests", suite)
	console.log(report)
	process.exit(failed === 0 ? 0 : -1)
})()
