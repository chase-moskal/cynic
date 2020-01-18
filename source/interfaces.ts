
export type Tests = (
	boolean
	| (() => Promise<Tests>)
	| {[key: string]: Tests}
)
