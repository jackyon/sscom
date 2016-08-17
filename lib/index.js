'use strict';

var _ReadDir = require('./modules/ReadDir/');

var _ReadDir2 = _interopRequireDefault(_ReadDir);

var _options = require('./options');

var _DataGenerator = require('./modules/DataGenerator/');

var _DataGenerator2 = _interopRequireDefault(_DataGenerator);

var _Temp = require('./modules/Temp/');

var _Temp2 = _interopRequireDefault(_Temp);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readComponentsDirs = (0, _ReadDir2.default)(_options.componentsPath);
var readContainersDirs = (0, _ReadDir2.default)(_options.containersPath);

Promise.all([readComponentsDirs, readContainersDirs]).then(function (values) {
	var componentsName = values[0],
	    containersName = values[1];

	console.log(_colors2.default.green('组件名称 =>', componentsName));
	console.log(_colors2.default.green('容器名称 =>', containersName));

	return (0, _DataGenerator2.default)(containersName, componentsName);
}).catch(function (err) {
	console.log(_colors2.default.red('出错啦 =>', err));
});

process.on('exit', function () {
	_shelljs2.default.exec('casperjs ' + __dirname + '/modules/Casperjs/index.js');
});