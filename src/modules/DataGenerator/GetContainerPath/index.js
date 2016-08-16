import fs from 'fs';
import glob from 'glob';
import { routesPath, containersPath, url } from '../../../options';

export default function(containerPath, containerName) {
	return new Promise((resolve, reject) => {
		let formatPath = containerPath.split('/').slice(-2)[0];
		let	path;

		glob(routesPath + '/**/**/index.js', (err, files) => {
			for (let file of files) {
				let content = fs.readFileSync(file, 'utf8');

				if (content.includes(formatPath)) {
					let regx = /path\:\s?["|'](.+)["|']/;

					if (content.includes('childRoutes') && formatPath !== 'App') {
						continue;
					} else {
						path = regx.exec(content)[1];
					}

					switch (path) {
						case '/':
							path = url;
							break;

						default:
							if (path.startsWith('/')) {
								path = url + '#' + path;
							} else {
								path = url + '#/' + path;
							}
							
							break;
					}

					resolve(path);

					return;
				}
			}
		});
	})
	
}