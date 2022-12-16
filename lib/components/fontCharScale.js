import { BR, DIV, SPAN } from "./basic.js";

export function FONT_CHAR_SCALE (props, font, charscale) {
	let gradient = [];

	for (let i=0;i<20;i++) {
		gradient.push(SPAN({},
			charscale.substring(0,i*4).split('').reverse().join('') +
			charscale.substring(1,charscale.length-(i*4))
		));
		gradient.push(BR());
	}

	return DIV(props, [
		DIV({
			style: {
				font: `18px "${font}"`,
				marginTop: '18px',
			}
		}, `${font} (${charscale.length} levels)`),
		DIV({
			style: {
				font: `15px "${font}"`,
				whiteSpace: 'pre'
			}
		}, gradient)
	])
}
