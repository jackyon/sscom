'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (path) {
	var tempData = [];
	return new Promise(function (resolve, reject) {
		_fs2.default.readdir(path, function (err, files) {
			if (err) {
				reject(err);
				return;
			}

			var notJunkFiles = files.filter(_junk2.default.not);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = notJunkFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var file = _step.value;

					if (!file.includes('.js')) {
						tempData.push(file);
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

			resolve(tempData);
		});
	});
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _junk = require('junk');

var _junk2 = _interopRequireDefault(_junk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];