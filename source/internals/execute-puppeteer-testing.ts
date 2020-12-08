
export async function executePuppeteerTesting({
		port,
		label,
		cynicPath,
		suitePath,
		importmapPath,
	}: {
		port: number
		label: string
		suitePath: string
		cynicPath: string
		importmapPath: string
	}) {
	const {runPuppeteer} = await import("./runners/run-puppeteer.js")
	await runPuppeteer({
		port,
		label,
		origin,
		suitePath,
		cynicPath,
		importmapPath,
		launchOptions: open
			? {headless: false, devtools: true}
			: {headless: true, devtools: false},
	})
}
