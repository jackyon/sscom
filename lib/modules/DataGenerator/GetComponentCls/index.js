'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (component) {
	return new Promise(function (resolve, reject) {
		(0, _glob2.default)(_options.componentsPath + component + '/**/**/index.js', function (err, files) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var file = _step.value;

					var content = _fs2.default.readFileSync(file, 'utf8');

					if (content.includes('className')) {
						var renderStr = content.substring(content.indexOf('render()'));

						var returnStr = renderStr.substring(renderStr.indexOf('return'));

						var regx = /className=["|'](.+)["|']/g;
						var className = void 0;

						try {
							className = regx.exec(returnStr)[1];
						} catch (err) {
							console.log(component + '出错了, 文件里头找不到 className');
						}

						resolve(className);

						return;
					} else {
						reject('在组件 ' + component + ' 中找不到 className');
					}
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
	});
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _options = require('../../../options');

var _ReadDir = require('../../ReadDir/');

var _ReadDir2 = _interopRequireDefault(_ReadDir);

var _ReadFile = require('../../ReadFile/');

var _ReadFile2 = _interopRequireDefault(_ReadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];