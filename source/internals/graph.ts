
import {repeat} from "../toolbox/repeat.js"
import {Results} from "./interfaces.js"

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

			// ✔ ✘ ✓ ✗ · ▽ ☰ ○ ▤ ▢
			const group = "▽ "
			const indent = (results3[s_counts] && !results3[s_pass])
				? "\n" + repeat("═", (depth * 2) - 1) + " "
				: repeat(" ", depth * 2)
			const icon = results3[s_pass]
				? results3[s_counts] ? "✓ " : group
				: results3[s_counts] ? "✘ " : group
			const errorMessage = results3[s_error]
				? `\n${repeat("―", depth * 2)}― ${results3[s_error].name}: ${results3[s_error].message}`
				: ""

			output += `\n${indent}${icon}${label}${errorMessage}`
			output += (results3[s_counts] && !results3[s_pass]) ? "\n" : ""
			recursive(results3, depth + 1)
		}
	}
	recursive(results1)
	return output
}
