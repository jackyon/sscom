<h1>Screenshot Components</h1>
> Generate screenshot of react component automatically.

![alt tag](https://s4.postimg.org/d9x9s3ist/ezgif_com_video_to_gif.gif)

<h2>notice:</h2>
this version still in beta, I wrote this tool base on the structure like this:
```
├── /app/                       
│   ├── /components/        # Generic React Components (generally Dumb components)
│   ├── /containers/        # Components that provide context (e.g. Redux Provider)
│   ├── /routes/            # Application route definitions
│   ├── ...       			# other folders|files
```
you can found more structure details on: https://github.com/jackyon/react-redux-boilerplate


<h2>Packages Install</h2>
```
$ npm install phantomjs -g
$ npm install casperjs -g
$ npm install sscom
```

<h2>Usage</h2>
```
Usage: sscom
  -h, --help      	  More usage and help infos
  -v, --version       Version number
```

<h2>Options</h2>
```
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
```
