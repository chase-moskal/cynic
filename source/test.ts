
import {Suite} from "./interfaces.js"
import {run} from "./internals/run.js"
import {render} from "./internals/render.js"

export async function test(label: string, suite: Suite) {
	const {results, stats} = await run(suite)
	const report = render({label, results, stats})
	return {...stats, report}
}
