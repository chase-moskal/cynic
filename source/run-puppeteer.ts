
import * as http from "http"
import puppeteer from "puppeteer"
import handler from "serve-handler"

export async function runPuppeteer({port, url}: {
	port: number
	url: string
}) {
	const server = http.createServer(handler)
	server.listen(port)

	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url)
	await page.waitFor(".report")
	const {report, failed} = await page.evaluate(() => ({
		failed: !!document.querySelector(".failed"),
		report: document.querySelector(".report").textContent,
	}))
	await browser.close()
	server.close()

	console.log(report)
	process.exit(failed ? -1 : 0)
}
