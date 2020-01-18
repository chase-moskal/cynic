
import {run} from "./internals/run.js"
import {Tests} from "./interfaces.js"
import {render} from "./internals/render.js"

export async function suite(label: string, tests: Tests) {
	const {results, stats} = await run(tests)
	const report = render({label, results, stats})
	return {...stats, report}
}
