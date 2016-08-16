'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (files, component) {
	return new Promise(function (resolve, reject) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var file = _step.value;

				(0, _GetFiles2.default)(file, component).then(function (results) {
					resolve(results);
				});
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

var _GetFiles = require('../GetFiles/');

var _GetFiles2 = _interopRequireDefault(_GetFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];