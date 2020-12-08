
import {graph} from "./graph.js"
import {Stats} from "../types.js"
import {conclude} from "./conclude.js"
import {Results} from "./internal-types.js"

export function renderReport({label, results, stats}: {
		stats: Stats
		label: string
		results: Results
	}) {

	const chart = graph(results)
	const conclusion = conclude(stats)

	let report = ""
	report += `\n${label}`
	report += `\n${chart}`
	report += `\n${conclusion}`
	report += `\n`

	report = report.replace(/\n/gi, "\n ")
	return report
}
