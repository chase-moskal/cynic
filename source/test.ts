
import {Suite} from "./types.js"
import {run} from "./internals/run.js"
import {renderReport} from "./internals/render-report.js"

export async function test(label: string, suite: Suite) {
	const {results, stats} = await run(suite)
	const report = renderReport({label, results, stats})
	return {...stats, report}
}
