
import {
	s_pass,
	s_error,
	s_counts,
} from "./symbols.js"

export interface Results {
	[s_pass]: boolean
	[s_error]: Error
	[s_counts]: boolean
	[key: string]: Results
}

export interface Stats {
	total: number
	failed: number
	errors: Error[]
	duration: number
}
