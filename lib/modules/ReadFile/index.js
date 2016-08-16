'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (path) {
	return new Promise(function (resolve, reject) {
		_fs2.default.readFile(path, 'utf8', function (err, contents) {
			if (err) {
				reject(err);
				return;
			} else {
				resolve(contents);
			}
		});
	});
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];