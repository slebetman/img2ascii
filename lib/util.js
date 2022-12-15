export function get (q) {
	return document.querySelector(q);
}

export function sleep (t) {
	return new Promise ((ok,no) => setTimeout(ok,t));
}

export function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	
	element.style.display = 'none';
	document.body.appendChild(element);
	
	element.click();
	
	document.body.removeChild(element);
}

