export function get (q) {
	return document.querySelector(q);
}

export function sleep (t) {
	return new Promise ((ok,no) => setTimeout(ok,t));
}

export function download (filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	
	element.style.display = 'none';
	document.body.appendChild(element);
	
	element.click();
	
	document.body.removeChild(element);
}

export function make (el, props, content) {
	let x = document.createElement(el);

	for (let p in props) {
		let val = props[p];
		if (p == 'style') {
			for (let s in val) {
				x.style[s] = val[s];
			}
		}
		else {
			x[p] = val;
		}
	}

	if (typeof content == 'string') {
		x.innerText = content;
	}
	else if (content instanceof Array) {
		content.forEach(c => {
			x.appendChild(c);
		})
	}
	else if (content !== undefined && content !== null) {
		x.appendChild(content);
	}

	return x;
}
