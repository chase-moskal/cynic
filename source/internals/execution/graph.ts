
import {Results} from "./execution-types.js"
import {assertTestValidity} from "./graphing/assert-test-validity.js"
import {writeReportForResults} from "./graphing/write-report-for-results.js"

export function graph(results1: Results) {
	let output = ""
	const failSummary: string[] = []

	function recursive(results2: Results, depth: number = 1) {
		assertTestValidity(results2)
		for (const [label, results3] of Object.entries(results2)) {
			const {summaries, caseReport} = writeReportForResults({
				depth,
				label,
				output,
				results: results3,
			})
			output += caseReport
			failSummary.push(...summaries)
			recursive(results3, depth + 1)
		}
	}

	recursive(results1)
	return output + (
		failSummary.length > 0
			? "\n\n" + failSummary.join("\n")
			: ""
	)
}
