import fs from 'fs';
import glob from 'glob';
import { containersPath } from '../../../../options';
import GetComponentCls from '../../GetComponentCls/';
import GetContainerPath from '../../GetContainerPath/';
import colors from 'colors';

//读取容器文件
export default function(file, component) {
	return new Promise((resolve, reject) => {
		let folderName = file;
		let conditional = '<' + component;

		glob(containersPath + file + '/**/**/index.js', (err, files) => {
			for (let file of files) {
				let content = fs.readFileSync(file, 'utf8');

				if (content.includes(conditional)) {
					Promise.all([GetComponentCls(component), GetContainerPath(file, folderName)])
					.then(results => {
						resolve(results);
					})
					.catch((err) => {
						console.log(colors.red('出错啦   =>', `在组件 ${component} 中找不到 className`));
					});

					return;
				}
			}
		});
	})
	
}