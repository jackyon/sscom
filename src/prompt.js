#!/usr/bin/env node
import pjson from '../package.json';
import fs from 'fs';
import prompt from 'prompt';
import jsonfile from 'jsonfile';
import createIfNotExist from 'create-if-not-exist';
import shell from 'shelljs';
jsonfile.spaces = 4;
const exec = require('child_process').exec;
let dataFile = '/tmp/data.json';
let file = '/tmp/options.json';
createIfNotExist(file, '[]');
let config = jsonfile.readFileSync(file);

/**
 * 是否重新输入
 */
const tipReType = () => {
	const schema = {
		properties: {
			retype: {
				description: '是否重新设置 (Y/N)',
				required: true
			}
		}
	}

	prompt.message = '';

	prompt.get(schema, (err, result) => {
		let retype = result.retype;
		clearJson();

		if (!err && retype === 'Y' || retype === 'y') {
			promptGo();
		}
	});
}

/**
 * 输入提示
 */
const promptGo = () => {

	const validatorLogin = () => {
		let needLoginVal = prompt.history('needLogin').value;

		return needLoginVal.length > 0 && needLoginVal !== 'N' && needLoginVal !== 'n';
	}

	const schema = {
		properties: {
		 	screenshotUrl: {
				description: '截图URL (必填)',
				message: '请填写即将要截图的url地址',
				required: true
		 	},
		 	projectPath: {
		 		description: '项目路径 (选填, 默认为当前目录)',
		 	},
		 	componentsPath: {
				description: '组件路径 (选填, 默认为 "app/components/")',
		 	},
		 	containersPath: {
				description: '容器路径 (选填, 默认为 "app/containers/")',
		 	},
		 	routesPath: {
				description: '路由路径 (选填, 默认为 "app/routes/")',
		 	},
		 	needLogin: {
				description: '是否需要登录 (选填 Y/N, 默认为 N)',
		 	},
		 	loginUrl: {
				description: '登录页面Url',
				message: '请填写登录页面Url',
				required: true,
				ask: () => {
					return validatorLogin();
				}
		 	},
			username: {
				description: '账号',
				message: '请填写登录账号',
				required: true,
				ask: () => {
					return validatorLogin();
				}
			},
			password: {
				description: '密码',
				message: '请填写登录密码',
				required: true,
				hidden: true,
				replace: '*',
				ask: () => {
					return validatorLogin();
				}
			},
			usernameSelector: {
				description: '账号Input的name值 (选填, 默认为username)',
				ask: () => {
					return validatorLogin();
				}
			},
			passwordSelector: {
				description: '密码Input的name值 (选填, 默认为password)',
				ask: () => {
					return validatorLogin();
				}
			},
			submitButtonSelector: {
				description: '提交按钮的 className || id (必填, 如 ".submit_button")',
				message: '请填入按钮的 className 或者 id',
				required: true,
				ask: () => {
					return validatorLogin();
				}
			}
		}
	};

	prompt.message = '';

	let formatPath = (path) => {
		let newPath = path.endsWith('/') ? path : path + '/';
		return newPath;
	}

	prompt.get(schema, (err, result) => {
		if (!err) {
			const formatProjectPath = formatPath(result.projectPath);
			const formatComponentsPath = formatPath(result.componentsPath);
			const formatContainersPath = formatPath(result.containersPath);
			const formatRoutesPath = formatPath(result.routesPath);
			const formatLoginUrl = formatPath(result.loginUrl);

			let obj = {
				screenshotUrl: result.screenshotUrl,
				projectPath: result.projectPath ? formatProjectPath : process.cwd() + '/',
				componentsPath: result.componentsPath ? formatComponentsPath : 'app/components/',
				containersPath: result.containersPath ? formatContainersPath : 'app/containers/',
				routesPath: result.routesPath ? formatRoutesPath : 'app/routes/',
				needLogin: result.needLogin && result.needLogin !== 'N' && result.needLogin !== 'n' ? true : false,
				username: result.username ? result.username : null,
				password: result.password ?  result.password : null,
				usernameSelector: result.usernameSelector ? result.usernameSelector : 'username',
				passwordSelector: result.passwordSelector ? result.passwordSelector : 'password',
				submitButtonSelector: result.submitButtonSelector ? result.submitButtonSelector : null,
				loginUrl: result.loginUrl ? formatLoginUrl : null
			};

			jsonfile.writeFileSync(file, obj);
		}
	});
}

/**
 * 当有options.json 有数据时先清除
 */
const clearJson = () => {
	if (fs.existsSync(dataFile)) {
		fs.unlinkSync(dataFile);
	}
};

/**
 * 退出
 */
const exit = (code) => {
	if(!code) {
		code = 0;
	}
	process.exit(code);
};

/**
 * 帮助信息
 */
const logHelp = () => {
	let message = `
  用法: sscom
    -h, --help          帮助信息.
    -v, --version       版本信息.

  例子: sscom

  选项:
  	- 截图URL: 完整链接, 必填, 如 "http://192.168.1.230:8080/"
  	- 项目路径: 完整路径, 选填, 默认为当前目录, 自定义目录需填写完整路径，如"/Users/jackyon/Desktop/react/"
  	- 组件路径: 相对路径, 选填, 默认为 "app/components/"
  	- 容器路径: 相对路径, 选填, 默认为 "app/containers/"
  	- 路由路径: 相对路径, 选填, 默认为 "app/routes/"
	- 是否需要登录: 选填 Y/N, 默认为 N

  	如果登录为是:
  	- 登录页面Url: 必填
  	- 账号: 必填
  	- 密码: 必填
  	- 账号Input的name值: 选填, 默认为 username
  	- 密码Input的name值: 选填, 默认为password
  	- 提交按钮 className 或 id: 必填, 如 ".submit_button"
  	
  	回车Enter键 或 "N"键 跳过选填项
	`
	console.log(message);
}

/**
 * 帮助信息
 */
const logVersion = () => {
	console.log(pjson.version);
}

const run = () => {
	let argvs = process.argv.slice(2);

	let checkArg = () => {
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
			//开始执行
			if (config.length === 0) {
				promptGo();
			} else {
				tipReType();
			}

			process.on('exit', function () {
				shell.exec(`node ${__dirname}/index.js`);
			});
		}
	}

	checkArg();
}

run();












