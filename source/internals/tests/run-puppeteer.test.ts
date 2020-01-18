
import {runPuppeteer} from "../../run-puppeteer.js"

const port = 8021

runPuppeteer({
	port,
	url: `http://localhost:${port}/`
})
