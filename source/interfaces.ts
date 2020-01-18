
export type Suite = (
	boolean
	| (() => Promise<Suite>)
	| {[key: string]: Suite}
)
