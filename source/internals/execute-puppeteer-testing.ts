
export async function executePuppeteerTesting(args: {
		port: number
		label: string
		origin: string
		suitePath: string
		cynicPath: string
		importmapPath: string
	}) {

	const {runPuppeteer} = await import("./runners/run-puppeteer.js")

	await runPuppeteer(args)
}
