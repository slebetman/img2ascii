import { download, make } from "../util.js";
import { DIV } from "./basic.js";

export function FONT_STAT_DOWNLOADER (props, stats) {
	return DIV({
		id: 'stat-downloader'
	},[
		make('button',{
			onclick: () => {
				console.log('downloading...');
				download('font-stats.json', JSON.stringify(stats,null,2));
			},
			style: {
				fontSize: '18px',
				backgroundColor: '#aaffcc',
				borderRadius: '8px 8px',
				padding: '5px 15px'
			}
		},'Download font stats')
	]);
}
