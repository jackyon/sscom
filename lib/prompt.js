#!/usr/bin/env node
'use strict';

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _prompt = require('prompt');

var _prompt2 = _interopRequireDefault(_prompt);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _createIfNotExist = require('create-if-not-exist');

var _createIfNotExist2 = _interopRequireDefault(_createIfNotExist);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jsonfile2.default.spaces = 4;
var exec = require('child_process').exec;
var dataFile = '/tmp/data.json';
var file = '/tmp/options.json';
(0, _createIfNotExist2.default)(file, '[]');
var config = _jsonfile2.default.readFileSync(file);

var tipReType = function tipReType() {
	var schema = {
		properties: {
			retype: {
				description: '是否重新设置 (Y/N)',
				required: true
			}
		}
	};

	_prompt2.default.message = '';

	_prompt2.default.get(schema, function (err, result) {
		var retype = result.retype;
		clearJson();

		if (!err && retype === 'Y' || retype === 'y') {
			promptGo();
		}
	});
};

var promptGo = function promptGo() {

	var validatorLogin = function validatorLogin() {
		var needLoginVal = _prompt2.default.history('needLogin').value;

		return needLoginVal.length > 0 && needLoginVal !== 'N' && needLoginVal !== 'n';
	};

	var schema = {
		properties: {
			screenshotUrl: {
				description: '截图URL (必填)',
				message: '请填写即将要截图的url地址',
				required: true
			},
			projectPath: {
				description: '项目路径 (选填, 默认为当前目录)'
			},
			componentsPath: {
				description: '组件路径 (选填, 默认为 "app/components/")'
			},
			containersPath: {
				description: '容器路径 (选填, 默认为 "app/containers/")'
			},
			routesPath: {
				description: '路由路径 (选填, 默认为 "app/routes/")'
			},
			needLogin: {
				description: '是否需要登录 (选填 Y/N, 默认为 N)'
			},
			loginUrl: {
				description: '登录页面Url',
				message: '请填写登录页面Url',
				required: true,
				ask: function ask() {
					return validatorLogin();
				}
			},
			username: {
				description: '账号',
				message: '请填写登录账号',
				required: true,
				ask: function ask() {
					return validatorLogin();
				}
			},
			password: {
				description: '密码',
				message: '请填写登录密码',
				required: true,
				hidden: true,
				replace: '*',
				ask: function ask() {
					return validatorLogin();
				}
			},
			usernameSelector: {
				description: '账号Input的name值 (选填, 默认为username)',
				ask: function ask() {
					return validatorLogin();
				}
			},
			passwordSelector: {
				description: '密码Input的name值 (选填, 默认为password)',
				ask: function ask() {
					return validatorLogin();
				}
			},
			submitButtonSelector: {
				description: '提交按钮的 className || id (必填, 如 ".submit_button")',
				message: '请填入按钮的 className 或者 id',
				required: true,
				ask: function ask() {
					return validatorLogin();
				}
			}
		}
	};

	_prompt2.default.message = '';

	var formatPath = function formatPath(path) {
		var newPath = path.endsWith('/') ? path : path + '/';
		return newPath;
	};

	_prompt2.default.get(schema, function (err, result) {
		if (!err) {
			var formatProjectPath = formatPath(result.projectPath);
			var formatComponentsPath = formatPath(result.componentsPath);
			var formatContainersPath = formatPath(result.containersPath);
			var formatRoutesPath = formatPath(result.routesPath);
			var formatLoginUrl = formatPath(result.loginUrl);

			var obj = {
				screenshotUrl: result.screenshotUrl,
				projectPath: result.projectPath ? formatProjectPath : process.cwd() + '/',
				componentsPath: result.componentsPath ? formatComponentsPath : 'app/components/',
				containersPath: result.containersPath ? formatContainersPath : 'app/containers/',
				routesPath: result.routesPath ? formatRoutesPath : 'app/routes/',
				needLogin: result.needLogin && result.needLogin !== 'N' && result.needLogin !== 'n' ? true : false,
				username: result.username ? result.username : null,
				password: result.password ? result.password : null,
				usernameSelector: result.usernameSelector ? result.usernameSelector : 'username',
				passwordSelector: result.passwordSelector ? result.passwordSelector : 'password',
				submitButtonSelector: result.submitButtonSelector ? result.submitButtonSelector : null,
				loginUrl: result.loginUrl ? formatLoginUrl : null
			};

			_jsonfile2.default.writeFileSync(file, obj);
		}
	});
};

var clearJson = function clearJson() {
	if (_fs2.default.existsSync(dataFile)) {
		_fs2.default.unlinkSync(dataFile);
	}
};

var exit = function exit(code) {
	if (!code) {
		code = 0;
	}
	process.exit(code);
};

var logHelp = function logHelp() {
	var message = '\n  用法: sscom\n    -h, --help          帮助信息.\n    -v, --version       版本信息.\n\n  例子: sscom\n\n  选项:\n  \t- 截图URL: 完整链接, 必填, 如 "http://192.168.1.230:8080/"\n  \t- 项目路径: 完整路径, 选填, 默认为当前目录, 自定义目录需填写完整路径，如"/Users/jackyon/Desktop/react/"\n  \t- 组件路径: 相对路径, 选填, 默认为 "app/components/"\n  \t- 容器路径: 相对路径, 选填, 默认为 "app/containers/"\n  \t- 路由路径: 相对路径, 选填, 默认为 "app/routes/"\n\t- 是否需要登录: 选填 Y/N, 默认为 N\n\n  \t如果登录为是:\n  \t- 登录页面Url: 必填\n  \t- 账号: 必填\n  \t- 密码: 必填\n  \t- 账号Input的name值: 选填, 默认为 username\n  \t- 密码Input的name值: 选填, 默认为password\n  \t- 提交按钮 className 或 id: 必填, 如 ".submit_button"\n  \t\n  \t回车Enter键 或 "N"键 跳过选填项\n\t';
	console.log(message);
};

var logVersion = function logVersion() {
	console.log(_package2.default.version);
};

var run = function run() {
	var argvs = process.argv.slice(2);

	var checkArg = function checkArg() {
		if (argvs.length > 0) {
			if (argvs[0] === '-' || argvs[0][0] === '-') {
				switch (argvs[0]) {
					case '-h':
					case '--help':
						logHelp();
						exit();
						break;

					case '-v':
					case '--version':
						logVersion();
						exit();
						break;

					default:
						break;
				}
			}
		} else {
			if (config.length === 0) {
				promptGo();
			} else {
				tipReType();
			}

			process.on('exit', function () {
				_shelljs2.default.exec('node ' + __dirname + '/index.js');
			});
		}
	};

	checkArg();
};

run();