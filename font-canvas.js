import {get} from "./lib/util.js"
import {getFontMetrics, generateCharScale} from "./lib/canvaslib.js"

let testFont = 'JMH Typewriter Bold';

window.onload = async () => {
	const paper = get('#paper');	
	const ctx = paper.getContext('2d',{ willReadFrequently: true });

	let log = get('#message');
	log.innerHTML = 'Scanning font..';
	
	let charscale = await generateCharScale(ctx, testFont);
	
	let fontHeight = getFontMetrics(ctx,'M').height;
	ctx.fillText(charscale, 0, fontHeight);
	console.log(charscale);
	
	log.innerHTML = '';
	console.log('done');
	
}

console.log('waiting for load');