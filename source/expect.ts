
import {CynicBrokenExpectation} from "./errors.js"

export function expect(value: any) {

	const ok = () => !!value

	const defined = () => (value !== undefined && value !== null)
		? true
		: false

	const equals = (comparison: any) => {
		return value === comparison
	}

	const throws = () => {
		if (typeof value !== "function") throw new CynicBrokenExpectation(
			`non-function cannot throw (${s(value)})`
		)
		let error: Error = undefined
		try { value() }
		catch(e) { error = e }
		return error !== undefined
	}

	return {
		ok: throwOnFailure(
			ok,
			`expect(${s(value)}).ok(): not ok, should be`
		),

		defined: throwOnFailure(
			defined,
			`expect(${s(value)}): should not be undefined or null, but is`
		),

		equals: (comparison: any) => throwOnFailure(
			equals,
			`expect(${s(value)}).equals(${s(comparison)}): not equal, should be`
		)(comparison),

		throws: throwOnFailure(
			throws,
			`expect(${s(value)}).throws(): nothing thrown, should be`
		),

		not: {
			ok: throwOnFailure(
				invert(ok),
				`expect(${s(value)}).not.ok(): should not be ok, but is`
			),

			defined: throwOnFailure(
				invert(defined),
				`expect(${s(value)}).defined(): should be undefined or null, but is not`
			),

			equals: (comparison: any) => throwOnFailure(
				invert(equals),
				`expect(${s(value)}).not.equals(${s(comparison)}): `
					+ `should not be equal, but is`
			)(comparison),

			throws: throwOnFailure(
				invert(throws),
				`expect(${s(value)}).not.throws(): something was thrown, should not be`
			),
		},
	}
}

function invert<F extends (...args: any[]) => boolean>(func: F): F {
	const inverted = (...args: any[]): boolean => !func(...args)
	return <F>inverted
}

function throwOnFailure<F extends (...args: any[]) => boolean>(func: F, message: string): F {
	const composite = (...args: any[]): boolean => {
		const result = func(...args)
		if (result) return result
		else throw new CynicBrokenExpectation(message)
	}
	return <F>composite
}

function s(x: any) {
	try { return x.toString() }
	catch (error) { return "<unknown>" }
}
