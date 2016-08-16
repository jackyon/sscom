'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsonfile2.default.readFileSync('/tmp/options.json');
var screenshotUrl = config.screenshotUrl;
var projectPath = config.projectPath;
var componentsPath = config.componentsPath;
var containersPath = config.containersPath;
var routesPath = config.routesPath;
exports.default = {
	componentsPath: projectPath + componentsPath,
	containersPath: projectPath + containersPath,
	routesPath: projectPath + routesPath,
	url: screenshotUrl
};
module.exports = exports['default'];