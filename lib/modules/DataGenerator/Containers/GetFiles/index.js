'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (file, component) {
	return new Promise(function (resolve, reject) {
		var folderName = file;
		var conditional = '<' + component;

		(0, _glob2.default)(_options.containersPath + file + '/**/**/index.js', function (err, files) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _file = _step.value;

					var content = _fs2.default.readFileSync(_file, 'utf8');

					if (content.includes(conditional)) {
						Promise.all([(0, _GetComponentCls2.default)(component), (0, _GetContainerPath2.default)(_file, folderName)]).then(function (results) {
							resolve(results);
						}).catch(function (err) {
							console.log(_colors2.default.red('出错啦   =>', '在组件 ' + component + ' 中找不到 className'));
						});

						return;
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

var _options = require('../../../../options');

var _GetComponentCls = require('../../GetComponentCls/');

var _GetComponentCls2 = _interopRequireDefault(_GetComponentCls);

var _GetContainerPath = require('../../GetContainerPath/');

var _GetContainerPath2 = _interopRequireDefault(_GetContainerPath);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];