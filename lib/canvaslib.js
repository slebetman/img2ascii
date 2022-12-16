import {get, sleep} from './util.js'

const charsToUse = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;:,<.>~!@#$%^&*()_+ '
const chars = charsToUse.split('');

async function waitForFont (ctx, fontSpec) {
	let log = get('#message');
	log.innerHTML = 'Loading fonts .';

	for (let x=0; x<100; x++) {
		await sleep(10);
		ctx.font = fontSpec;
		let check = document.fonts.check(fontSpec);
		log.style.font = fontSpec;
		log.innerHTML += ' .';
		
		if (check) break;
	}
	
	log.innerHTML = '';
}

export async function generateCharScale (ctx, font, size) {
	const paper = ctx.canvas;
	const fontSpec = `${size}px "${font}"`;
	let charmap = {};

	chars.forEach(c => {
		charmap[c] = 0;
	})
	
	await waitForFont(ctx, fontSpec);
	
	ctx.font = fontSpec;
		
	let fontHeight = getFontMetrics(ctx,'M').height;
	
	chars.forEach(c => {
		// Erika Typewriter has very bad glyph for @ sign so we skip it:
		if (font.match(/Erika/) && c === '@') return;

		ctx.clearRect(0,0, paper.width, paper.height);
		ctx.fillText(c, 0, fontHeight);
		
		const imgData = ctx.getImageData(0, 0, paper.width, paper.height);
		
		let darkness = 0;
		scan(imgData,0,0, paper.width, paper.height, (img,idx,pixel) => {
			let color = 255 - ((pixel.r + pixel.g + pixel.b) / 3);
			darkness += color * (pixel.a/255);
		})
		
		charmap[c] = darkness;
	});

	// Remove chars with same darkness value:y
	let reversemap = Object.fromEntries(
		Object.entries(charmap)
			.map(x => [x[1],x[0]])
	);
	
	let charscale = Object.entries(reversemap)
		.sort((a,b) => a[0]-b[0])
		.map(x => x[1]);
	
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

export async function getMetricsForFont (ctx, font, size) {
	const fontSpec = `${size}px "${font}"`;
	ctx.font = fontSpec;
	await waitForFont(ctx, fontSpec);
	return getFontMetrics(ctx, 'M');
}

