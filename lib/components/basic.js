import { make } from '../util.js'

export function DIV (props, content) {
	return make('div',props,content);
}

export function SPAN (props, content) {
	return make('span',props,content);
}

export function BR () {
	return make('br',{});
}
