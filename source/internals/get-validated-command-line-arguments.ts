
import {Command} from "commander"
import {parseBoolean} from "./toolbox/parse-boolean.js"

export function getValidatedCommandLineArguments(command: Command) {
	const {
		port,
		open,
		label,
		origin,
		cynicPath,
		importmapPath,
	} = command.opts()

	const [environment, suitePath] = command.args

	if (!environment)
		throw new Error(`1st argument 'environment' required`)

	if (!suitePath)
		throw new Error(`2nd argument 'suitePath' required`)

	return {
		label,
		origin,
		cynicPath,
		suitePath,
		importmapPath,
		port: parseInt(port),
		open: parseBoolean(open),
		environment: environment.toLowerCase(),
	}
}
