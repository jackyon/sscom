import fs from 'fs';
import { componentsPath } from '../../options';
import jsonfile from 'jsonfile';
import GetContainerDirs from './Containers/GetDirs/';
import createIfNotExist from 'create-if-not-exist';
jsonfile.spaces = 4;
let file = '/tmp/data.json';

function appendObject(obj){
	createIfNotExist(file, '[]');
	let config = jsonfile.readFileSync(file);
	config.push(obj);
	jsonfile.writeFileSync(file, config);
}

export default function(containersName, componentsName) {
	return new Promise((resolve, reject) => {
		let tempData = [],
		counter = 1;

		for (let componentName of componentsName) {
			GLOBAL.CP_COUNTER++;

			GetContainerDirs(containersName, componentName)
			.then(results => {
				let obj = {};
				obj['className'] = results[0];
				obj['url'] = results[1];
				obj['componentName'] = componentName;
				obj['componentPath'] = componentsPath + componentName + '/';
				tempData.push(obj);

				appendObject(obj);
			})
		}
	})
}