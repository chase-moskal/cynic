
import {Tests} from "../interfaces.js"
import {test} from "./test.js"
import {summary} from "./summary.js"

export async function run(tests: Tests) {
	const start = Date.now()
	const results = await test(tests)
	const duration = Date.now() - start
	const stats = {...summary(results), duration}
	return {results, stats}
}
