
import {s_pass} from "../symbols.js"
import {Results} from "../execution-types.js"

export function assertTestValidity(results: Results) {
	if (typeof results[s_pass] !== "boolean") throw new Error(`invalid test result`)
}
