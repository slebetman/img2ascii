import { div } from "../util.js";

export function fontCharScale (props, font, charscale) {
	return div(props, [
		div({
			style: {
				font: `20px "${font}"`,
				marginTop: '15px',
			}
		}, `${font} (${charscale.length} levels)`),
		div({
			style: {
				font: `15px "${font}"`
			}
		}, charscale)
	])
}
