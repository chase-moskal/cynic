
import {asyncObjectMap} from "./toolbox/object-map.js"

export type Tests = boolean
	| (() => Promise<Tests>)
	| {[key: string]: Tests}

	const pass = Symbol("pass")
	const error = Symbol("error")
	const counts = Symbol("counts")

export interface TestResults {
	[error]: Error
	[pass]: boolean
	[counts]: boolean
	[key: string]: TestResults
}

export async function test(tests: Tests): Promise<TestResults> {
	if (typeof tests === "boolean") {
		return {
			[pass]: tests,
			[error]: null,
			[counts]: true,
		}
	}
	else if (typeof tests === "function") {
		try {
			const result = await tests()
			return {
				[pass]: !!result,
				[error]: null,
				[counts]: true,
			}
		}
		catch (err) {
			return {
				[pass]: false,
				[error]: err,
				[counts]: true,
			}
		}
	}
	else if (typeof tests === "object") {
		let all = true
		const results = await asyncObjectMap(tests, async value => {
			const r = await test(value)
			if (!r[pass]) all = false
			return r
		})
		return {
			...results,
			[pass]: all,
			[error]: null,
			[counts]: false,
		}
	}
	else throw new Error(`invalid testee type`)
}

function repeat(x: string, n: number) {
	let output = ""
	for (let i = 0; i < n; i++)
		output += x
	return output
}

export function graph(results1: TestResults) {
	let output = ""
	function recursive(results2: TestResults, depth: number = 1) {
		if (typeof results2[pass] !== "boolean") throw new Error(`invalid test result`)
		for (const [label, results3] of Object.entries(results2)) {

			// ✔ ✘ ✓ ✗ · ▽ ☰ ○ ▤ ▢
			const group = "▽ "
			const indent = (results3[counts] && !results3[pass])
				? "\n" + repeat("═", (depth * 2) - 1) + " "
				: repeat(" ", depth * 2)
			const icon = results3[pass]
				? results3[counts] ? "✓ " : group
				: results3[counts] ? "✘ " : group
			const errorMessage = results3[error]
				? `\n${repeat("―", depth * 2)}― ${results3[error].name}: ${results3[error].message}`
				: ""

			output += `\n${indent}${icon}${label}${errorMessage}`
			output += (results3[counts] && !results3[pass]) ? "\n" : ""
			recursive(results3, depth + 1)
		}
	}
	recursive(results1)
	return output
}

export function summary(results1: TestResults) {
	let total = 0
	let failed = 0
	const errors: Error[] = []
	function recursive(results2: TestResults, depth: number = 1) {
		if (typeof results2[pass] !== "boolean") throw new Error(`invalid test result`)
		for (const [,results3] of Object.entries(results2)) {
			if (results3[counts]) {
				total += 1
				failed += results3[pass] ? 0 : 1
				if (results3[error]) errors.push(results3[error])
			}
			recursive(results3, depth + 1)
		}
	}
	recursive(results1)
	return {total, failed, errors}
}

export async function suite(label: string, tests: Tests) {
	const start = Date.now()
	const results = await test(tests)
	const duration = ((Date.now() - start) / 1000).toFixed(2)
	const {total, failed, errors} = summary(results)
	const conclusion = [
		`${failed} failed tests`,
		`${errors.length} thrown errors`,
		`${total - failed} passed tests`,
		`${total} total tests`,
		`${duration} seconds`,
	]

	let output = ""
	output += `\n${label}`
	output += `\n${graph(results)}`
	output += `\n`
	output += `\n${conclusion.join("\n")}`
	output += `\n`

	output = output.replace(/\n/gi, "\n ")
	return output
}
