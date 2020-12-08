
import {Results} from "../execution-types.js"
import {repeat} from "../../toolbox/repeat.js"
import {s_counts, s_pass} from "../symbols.js"
import {calculateIcon} from "./calculate-icon.js"
import {calculateIndent} from "./calculate-indent.js"
import {processFailuresAndInline} from "./process-failures-and-inline.js"

export function writeReportForResults({
			depth,
			label,
			output,
			results,
		}: {
			depth: number
			label: string
			output: string
			results: Results
		}) {

	const {inline, summaries} = processFailuresAndInline({
		results,
		formatStack: stack => stack
			.replace(/\n/g, `\n${repeat(" ", (depth * 2) - 1)}`),
	})

	const inlineMessage = inline
		.map(i => `\n${repeat("―", depth * 2)}― ${i}`)
		.join("")

	const indent = calculateIndent({output, depth, results})
	const icon = calculateIcon(results)
	const failed = results[s_counts] && !results[s_pass]
	const eol = failed ? "\n" : ""
	const caseReport = `\n${indent}${icon} ${label}${inlineMessage}${eol}`

	return {caseReport, summaries}
}
