
import {Tests} from "../interfaces.js"
import {asyncObjectMap} from "../toolbox/object-map.js"

import {Results} from "./interfaces.js"
import {
	s_pass,
	s_error,
	s_counts,
} from "./symbols.js"

export async function test(tests: Tests): Promise<Results> {
	if (typeof tests === "boolean") {
		return {
			[s_pass]: tests,
			[s_error]: null,
			[s_counts]: true,
		}
	}
	else if (typeof tests === "function") {
		try {
			const result = await tests()
			return {
				[s_pass]: !!result,
				[s_error]: null,
				[s_counts]: true,
			}
		}
		catch (err) {
			return {
				[s_pass]: false,
				[s_error]: err,
				[s_counts]: true,
			}
		}
	}
	else if (typeof tests === "object") {
		let all = true
		const results = await asyncObjectMap(tests, async value => {
			const r = await test(value)
			if (!r[s_pass]) all = false
			return r
		})
		return {
			...results,
			[s_pass]: all,
			[s_error]: null,
			[s_counts]: false,
		}
	}
	else throw new Error(`invalid test type`)
}
