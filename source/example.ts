
import {Suite, tests} from "./cynic.js"

const suite: Suite = {
	"environment test": true,
	"cryptography": {
		"simple hash works": async() => {
			return true
			throw new Error("major error!")
		},
		"deliberately fails": async() => {
			try {
				return true
				throw new Error("major error!")
			}
			catch (error) {
				return true
			}
		},
		"digital signatures": {
			"can be signed and verified": true,
			"can detect tampered data": true,
			"can detect tampered keys": true,
		},
		"encrypt/decrypt": true,
	},
	"json rpc": {
		"renraku works from node": async() => {
			return new Promise((resolve, reject) => {
				setTimeout(() => resolve(true), 10)
			})
		},
		"renraku works in browser": true,
	},
}

;(async() => {

	const {report} = await tests(
		"My example test suite!",
		suite
	)

	console.log(report)

})()
