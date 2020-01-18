
export function objectMap<V = any, X = any, O extends {} = {}>(
	input: O,
	mapper: (value: X, key: string) => V
): {[P in keyof O]: V} {
	const output: any = {}
	for (const [key, value] of Object.entries<X>(input))
		output[key] = mapper(value, key)
	return output
}

export async function asyncObjectMap<V = any, X = any, O extends {} = {}>(
	input: O,
	mapper: (value: X, key: string) => Promise<V>
): Promise<{[P in keyof O]: V}> {
	const output: any = {}
	const promises = Object.entries(input)
		.map(async([key, value]) => [key, await mapper(<X>value, key)])
	for (const [key, value] of await Promise.all(promises))
		output[key] = value
	return output
}
