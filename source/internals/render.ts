
import {graph} from "./graph.js"
import {Stats} from "../interfaces.js"
import {conclude} from "./conclude.js"
import {Results} from "./internal-interfaces.js"

export function render({label, results, stats}: {
	stats: Stats
	label: string
	results: Results
}) {
	const chart = graph(results)
	const conclusion = conclude(stats)

	let output = ""
	output += `\n${label}`
	output += `\n${chart}`
	output += `\n${conclusion}`
	output += `\n`

	output = output.replace(/\n/gi, "\n ")
	return output
}
