import ReadDir from './modules/ReadDir/';
import { componentsPath, containersPath } from './options';
import DataGenerator from './modules/DataGenerator/';
import TempVariables from './modules/Temp/';
import colors from 'colors';
import shell from 'shelljs';
import jsonfile from 'jsonfile';

// idea
// 找组件 => 找容器 => 找组件className + 找url => 生成data => phantomjs

let readComponentsDirs = ReadDir(componentsPath);
let readContainersDirs = ReadDir(containersPath);

Promise.all([readComponentsDirs, readContainersDirs])
.then((values) => {
	let componentsName = values[0],
		containersName = values[1];

	console.log(colors.green('组件名称 =>', componentsName));
	console.log(colors.green('容器名称 =>', containersName));

	//生成data
	return DataGenerator(containersName, componentsName);
})
.catch((err) => {
	console.log(colors.red('出错啦 =>', err));
});


process.on('exit', function () {
	console.log('json 文件生成完毕!');
	shell.exec(`casperjs ${__dirname}/modules/Casperjs/index.js`);
});