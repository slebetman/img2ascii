import { get } from "./lib/util.js"
import { generateCharScale, getMetricsForFont } from "./lib/canvaslib.js"
import { FONT_CHAR_SCALE } from "./lib/components/fontCharScale.js";
import { FONT_STAT_DOWNLOADER } from "./lib/components/fontStatDownloader.js";
import { DIV } from "./lib/components/basic.js";

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

	const fontScales = DIV({
		id: 'font-scales'
	},[]);

	document.body.appendChild(fontScales);

	const fontSize = 40;

	for (let theFont of fonts) {

		let charscale = (await generateCharScale(ctx, theFont, fontSize)).join('');
		
		fontScales.appendChild(FONT_CHAR_SCALE({}, theFont, charscale));

		let metrics = await getMetricsForFont(ctx, theFont, fontSize);

		fontStats.push({
			font: theFont,
			metrics,
			charscale
		})
			
		console.log(charscale);
	}

	document.body.insertBefore(FONT_STAT_DOWNLOADER({}, fontStats), fontScales);
	
	log.innerHTML = '';
	console.log('font stats', fontStats);
	console.log('done');
}

console.log('waiting for load');