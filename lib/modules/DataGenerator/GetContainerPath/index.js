'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (containerPath, containerName) {
	return new Promise(function (resolve, reject) {
		var formatPath = containerPath.split('/').slice(-2)[0];
		var path = void 0;

		(0, _glob2.default)(_options.routesPath + '/**/**/index.js', function (err, files) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var file = _step.value;

					var content = _fs2.default.readFileSync(file, 'utf8');

					if (content.includes(formatPath)) {
						var regx = /path\:\s?["|'](.+)["|']/;

						if (content.includes('childRoutes') && formatPath !== 'App') {
							continue;
						} else {
							path = regx.exec(content)[1];
						}

						switch (path) {
							case '/':
								path = _options.url;
								break;

							default:
								if (path.startsWith('/')) {
									path = _options.url + '#' + path;
								} else {
									path = _options.url + '#/' + path;
								}

								break;
						}

						resolve(path);

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

var _options = require('../../../options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];