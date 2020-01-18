
import {test} from "../../cynic.js"
import {suite} from "./cynic.test.js"

;(async() => {
	const {report, failed} = await test("cynic node tests", suite)
	console.log(report)
	console.log(failed === 0 ? "*PASSING*" : "*FAILING*")
})()
