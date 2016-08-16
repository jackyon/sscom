import fs from 'fs';
import glob from 'glob';
import { componentsPath } from '../../../options';
import ReadDir from '../../ReadDir/';
import ReadFile from '../../ReadFile/';

export default function(component) {
	return new Promise((resolve, reject) => {
		glob(componentsPath + component + '/**/**/index.js', (err, files) => {
			for (let file of files) {
				let content = fs.readFileSync(file, 'utf8');

				if (content.includes('className')) {
					let renderStr = content.substring(content.indexOf('render()'));
					// console.log(renderStr, 'renderstr');
					let returnStr = renderStr.substring(renderStr.indexOf('return'));
					// console.log(returnStr, 'returnStr');
					let regx = /className=["|'](.+)["|']/g;
					let className;

					try{
						className = regx.exec(returnStr)[1];
					} catch(err) {
						console.log(component + '出错了, 文件里头找不到 className');
					}

					resolve(className);

					return;
				} else {
					reject(`在组件 ${component} 中找不到 className`);
				}
			}
		});
	});
}