
import {test} from "../../test.js"
import {Suite} from "../../interfaces.js"

export async function runNode(label: string, suite: Suite) {
	const {report, failed} = await test(label, suite)
	console.log(report)
	process.exit(failed === 0 ? 0 : 1)
}
