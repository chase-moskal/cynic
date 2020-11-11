
import {repeat} from "./toolbox/repeat.js"
import {Results} from "./internal-types.js"

import {
	s_pass,
	s_error,
	s_counts,
} from "./symbols.js"

export function graph(results1: Results) {
	let output = ""
	const failSummary: string[] = []

	function recursive(results2: Results, depth: number = 1) {
		if (typeof results2[s_pass] !== "boolean") throw new Error(`invalid test result`)
		for (const [label, results3] of Object.entries(results2)) {

			// ✔ ✘ ✓ ✗ · ▽ ☰ ○ ▤ ▢

			const group = "▽"

			const errorLeadNewline = output.length > 1
				? output[output.length - 1] === "\n"
					? ""
					: "\n"
				: ""

			const indent = (results3[s_counts] && !results3[s_pass])
				? errorLeadNewline + repeat("═", (depth * 2) - 1) + " "
				: repeat(" ", depth * 2)

			const icon = results3[s_pass]
				? results3[s_counts] ? "✓" : group
				: results3[s_counts] ? "✘" : group

			const thrown = results3[s_error]
			let inlineMessage = ""

			function registerFailure({inline, summary}: {
						inline?: string
						summary?: string
					}) {
				if (inline) inlineMessage += `\n${repeat("―", depth * 2)}― ${inline}`
				if (summary) failSummary.push(`${icon} ${label} — ${summary}`)
			}

			if (thrown !== undefined && thrown !== null) {
				if (typeof thrown === "string") {
					registerFailure({
						inline: thrown,
						summary: thrown,
					})
				}
				else if (thrown.stack) {
					const stack = thrown.stack.replace(/\n/g, `\n${repeat(" ", (depth * 2) - 1)}`)
					registerFailure({
						inline: thrown.stack,
						summary: `${thrown.name} ${thrown.message}`,
					})
				}
				else {
					const unknown = "*unknown throw type*"
					registerFailure({
						inline: unknown,
						summary: unknown,
					})
				}
			}
			else {
				if (results3[s_counts] && !results3[s_pass]) {
					registerFailure({
						summary: "failed"
					})
				}
			}

			output += `\n${indent}${icon} ${label}${inlineMessage}`
			output += (results3[s_counts] && !results3[s_pass]) ? "\n" : ""
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
