'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (containersName, componentsName) {
	return new Promise(function (resolve, reject) {
		var tempData = [],
		    counter = 1;

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			var _loop = function _loop() {
				var componentName = _step.value;

				GLOBAL.CP_COUNTER++;

				(0, _GetDirs2.default)(containersName, componentName).then(function (results) {
					var obj = {};
					obj['className'] = results[0];
					obj['url'] = results[1];
					obj['componentName'] = componentName;
					obj['componentPath'] = _options.componentsPath + componentName + '/';
					tempData.push(obj);

					appendObject(obj);
				});
			};

			for (var _iterator = componentsName[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				_loop();
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	});
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _options = require('../../options');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _GetDirs = require('./Containers/GetDirs/');

var _GetDirs2 = _interopRequireDefault(_GetDirs);

var _createIfNotExist = require('create-if-not-exist');

var _createIfNotExist2 = _interopRequireDefault(_createIfNotExist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsonfile2.default.spaces = 4;
var file = '/tmp/data.json';

function appendObject(obj) {
	(0, _createIfNotExist2.default)(file, '[]');
	var config = _jsonfile2.default.readFileSync(file);
	config.push(obj);
	_jsonfile2.default.writeFileSync(file, config);
}

module.exports = exports['default'];