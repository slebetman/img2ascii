import {get, sleep} from './util.js'

const charsToUse = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;:,<.>~!@#$%^&*()_+ '
const chars = charsToUse.split('');

let charmap = {};

chars.forEach(c => {
	charmap[c] = 0;
})

async function waitForFont (ctx, fontSpec) {
	let log = get('#message');
	log.innerHTML = 'Loading fonts .';

	for (let x=0; x<100; x++) {
		await sleep(50);
		ctx.font = fontSpec;
		let check = document.fonts.check(fontSpec);
		log.style.font = fontSpec;
		log.innerHTML += ' .';
		
		if (check) break;
	}
	
	log.innerHTML = '';
}

export async function generateCharScale (ctx, font) {
	const paper = ctx.canvas;
	
	const fontSpec = `15px "${font}"`;
	
	await waitForFont(ctx, fontSpec);
	
	ctx.font = fontSpec;
		
	let fontHeight = getFontMetrics(ctx,'M').height;
	
	chars.forEach(c => {
		ctx.clearRect(0,0, paper.width, paper.height);
		ctx.fillText(c, 0, fontHeight);
		
		const imgData = ctx.getImageData(0, 0, paper.width, paper.height);
		
		let darkness = 0;
		scan(imgData,0,0, paper.width, paper.height, (img,idx,pixel) => {
			darkness += pixel.a;
		})
		
		charmap[c] = darkness;
	});
	
	let charscale = Object.entries(charmap)
		.sort((a,b) => a[1]-b[1])
		.map(x => x[0])
		.join('');
	
	return charscale;	
}

export function scan (img, startX, startY, width, height, callback) {
	for (let y=startY; y<height; y++) {
	for (let x=startX; x<width; x++) {
		let idx = (x+y*width)*4;
		
		let r = img.data[idx];
		let g = img.data[idx+1];
		let b = img.data[idx+2];
		let a = img.data[idx+3];
		
		callback(img, idx, {r,g,b,a});
	}}
}

export function getFontMetrics (ctx, txt) {
	const metrics = ctx.measureText(txt);
	const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
	
	return {
		width: Math.ceil(metrics.width),
		height: height,
	}
}
