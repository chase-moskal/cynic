
import {repeat} from "./toolbox/repeat.js"
import {Results} from "./internal-types.js"
import {s_pass, s_error, s_counts} from "./symbols.js"

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

//
//
//

function assertTestValidity(results: Results) {
	if (typeof results[s_pass] !== "boolean")
		throw new Error(`invalid test result`)
}

function writeReportForResults({
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
		results: results,
		formatStack: stack => stack
			.replace(/\n/g, `\n${repeat(" ", (depth * 2) - 1)}`),
	})
	const inlineMessage = inline
		.map(i => `\n${repeat("―", depth * 2)}― ${i}`)
		.join("")

	const indent = calculateIndent({output, depth, results: results})
	const icon = calculateIcon(results)
	const failed = results[s_counts] && !results[s_pass]
	const eol = failed ? "\n" : ""
	const caseReport = `\n${indent}${icon} ${label}${inlineMessage}${eol}`

	return {caseReport, summaries}
}

// ✔ ✘ ✓ ✗ · ▽ ☰ ○ ▤ ▢
const icons = {
	group: "▽",
	pass: "✓",
	fail: "✘",
}

function calculateIndent({output, results, depth}: {
			depth: number
			output: string
			results: Results
		}) {
	const errorLeadNewline = output.length > 1
		? output[output.length - 1] === "\n"
			? ""
			: "\n"
		: ""
	return (results[s_counts] && !results[s_pass])
		? errorLeadNewline + repeat("═", (depth * 2) - 1) + " "
		: repeat(" ", depth * 2)
}

function calculateIcon(results: Results) {
	return results[s_pass]
		? results[s_counts] ? icons.pass : icons.group
		: results[s_counts] ? icons.fail : icons.group
}

function processFailuresAndInline({
			results,
			formatStack,
		}: {
			results: Results
			formatStack: (stack: string) => string
		}) {

	const error = results[s_error]
	const inline = []
	const summaries = []

	if (error !== undefined && error !== null) {
		if (typeof error === "string") {
			inline.push(error)
			summaries.push(error)
		}
		else if (error.stack) {
			inline.push(formatStack(error.stack))
			summaries.push(`${error.name} ${error.message}`)
		}
		else {
			const unknown = "*unknown throw type*"
			inline.push(unknown)
			summaries.push(unknown)
		}
	}
	else {
		if (results[s_counts] && !results[s_pass]) {
			summaries.push("failed")
		}
	}

	return {inline, summaries}
}
