import {get, div} from "./lib/util.js"
import {generateCharScale, getMetricsForFont} from "./lib/canvaslib.js"

const fonts = [
	// 'Carbon',
	'CMU',
	'Erika Typewriter',
	'Erika Typewriter Bold',
	'Droid Sans Mono',
	'JMH Typewriter',
	'JMH Typewriter Bold',
	'Underwood Champion',
	'Nouveau IBM',
	'PT Mono',
	'Iconsolata',
	'Iconsolata Bold',
	'SV Basic',
	'SV Basic Bold',
	// 'Microscan',
	'DEC Terminal',
	// 'Cutive Mono',
];

let fontStats = [];

window.onload = async () => {
	const paper = get('#paper');	
	const ctx = paper.getContext('2d',{ willReadFrequently: true });

	let log = get('#message');
	log.innerHTML = 'Scanning fonts..';

	for (let theFont of fonts) {

		let charscale = (await generateCharScale(ctx, theFont)).join('');
		
		document.body.appendChild(div({},[
			div({
				style: {
					font: `20px "${theFont}"`,
					marginTop: '15px',
				}
			}, `${theFont} (${charscale.length} levels)`),
			div({
				style: {
					font: `15px "${theFont}"`
				}
			}, charscale)
		]))

		let metrics = await getMetricsForFont(ctx, theFont, 15);

		fontStats.push({
			font: theFont,
			metrics,
			charscale
		})
			
		console.log(charscale);
	}
	
	log.innerHTML = '';
	console.log('font stats', fontStats);
	console.log('done');
}

console.log('waiting for load');