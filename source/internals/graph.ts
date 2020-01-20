
import {Results} from "./internal-interfaces.js"
import {repeat} from "./toolbox/repeat.js"

import {
	s_pass,
	s_error,
	s_counts,
} from "./symbols.js"

export function graph(results1: Results) {
	let output = ""
	function recursive(results2: Results, depth: number = 1) {
		if (typeof results2[s_pass] !== "boolean") throw new Error(`invalid test result`)
		for (const [label, results3] of Object.entries(results2)) {
			const errorLeadNewline = output.length > 1
				? output[output.length - 1] === "\n"
					? ""
					: "\n"
				: ""

			// ✔ ✘ ✓ ✗ · ▽ ☰ ○ ▤ ▢
			const group = "▽ "
			const indent = (results3[s_counts] && !results3[s_pass])
				? errorLeadNewline + repeat("═", (depth * 2) - 1) + " "
				: repeat(" ", depth * 2)
			const icon = results3[s_pass]
				? results3[s_counts] ? "✓ " : group
				: results3[s_counts] ? "✘ " : group

			let errorMessage = ""
			const thrown = results3[s_error]
			if (thrown !== undefined && thrown !== null) {
				if (typeof thrown === "string") {
					errorMessage = `\n${repeat("―", depth * 2)}― ${thrown}`
				}
				else if (thrown.stack) {
					const stack = thrown.stack.replace(/\n/g, `\n${repeat(" ", (depth * 2) - 1)}`)
					errorMessage = `\n${repeat("―", depth * 2)}― ${stack}`
				}
				else {
					errorMessage = `\n${repeat("―", depth * 2)}― *unknown throw type*`
				}
			}

			output += `\n${indent}${icon}${label}${errorMessage}`
			output += (results3[s_counts] && !results3[s_pass]) ? "\n" : ""
			recursive(results3, depth + 1)
		}
	}
	recursive(results1)
	return output
}
