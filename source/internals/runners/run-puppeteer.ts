
import {runServer} from "./run-server.js"
import {LaunchOptions, launch} from "puppeteer"
import {cynicTestFileName} from "../constants.js"

export async function runPuppeteer(args: {
		port: number
		label: string
		origin: string
		suitePath: string
		cynicPath: string
		importmapPath?: string
		launchOptions?: LaunchOptions
	}) {

	const server = runServer(args)
	const browser = await launch(args.launchOptions ?? {})

	const page = await browser.newPage()
	await page.goto(`${args.origin}/${cynicTestFileName}`)
	await page.waitForSelector(".report")

	const {report, failed} = await page.evaluate(() => ({
		failed: !!document.querySelector(".failed"),
		report: document.querySelector(".report").textContent,
	}))

	await browser.close()
	server.close()

	console.log(report)
	process.exit(failed ? 1 : 0)
}
