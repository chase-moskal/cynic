
import puppeteer from "puppeteer"
import {runServer} from "./run-server.js"
import {cynicTestFileName} from "../constants.js"

export async function runPuppeteer({
	port,
	label,
	origin,
	suitePath,
	cynicPath,
	launchOptions = {},
}: {
	port: number
	label: string
	origin: string
	suitePath: string
	cynicPath: string
	launchOptions?: puppeteer.LaunchOptions
}) {
	const server = runServer({
		port,
		label,
		suitePath,
		cynicPath,
	})

	const browser = await puppeteer.launch(launchOptions)
	const page = await browser.newPage()
	await page.goto(`${origin}/${cynicTestFileName}`)
	await page.waitFor(".report")
	const {report, failed} = await page.evaluate(() => ({
		failed: !!document.querySelector(".failed"),
		report: document.querySelector(".report").textContent,
	}))
	await browser.close()
	server.close()

	console.log(report)
	process.exit(failed ? 1 : 0)
}
