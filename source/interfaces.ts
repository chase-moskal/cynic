
export type Suite = (
	boolean
	| (() => Promise<Suite>)
	| {[key: string]: Suite}
)

export interface Stats {
	total: number
	failed: number
	errors: Error[]
	duration: number
}
