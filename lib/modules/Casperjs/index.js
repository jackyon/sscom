'use strict';

var _casper = require('casper');

var _casper2 = _interopRequireDefault(_casper);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var file = '/tmp/data.json';
var data = JSON.parse(_fs2.default.read(file));
var options = JSON.parse(_fs2.default.read('/tmp/options.json'));
var count = 0;

var casper = _casper2.default.create({
    viewportSize: { width: 320, height: 480 },
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
    }
});

casper.start();

if (options.needLogin) {
    casper.thenOpen(options.loginUrl);

    casper.then(function () {
        this.evaluate(function () {
            var event = new Event('input', { bubbles: true });
            document.getElementsByName("username")[0].value = "13726508066";
            document.getElementsByName("username")[0].dispatchEvent(event);
            document.getElementsByName("password")[0].value = "11111";
            document.getElementsByName("password")[0].dispatchEvent(event);
            document.getElementsByClassName('btn_highlight')[0].click();
        });
    });

    casper.wait(3000, function () {
        console.log("正在登录...");
    });
}

var handlePage = function handlePage(data, count) {
    var elem = data[count],
        url = elem.url,
        className = '.' + elem.className,
        componentPath = elem.componentPath,
        componentName = elem.componentName;
    console.log(url);
    casper.thenOpen(url);

    casper.waitFor(function check() {
        return this.evaluate(function () {
            var images = document.getElementsByTagName('img');
            return Array.prototype.every.call(images, function (i) {
                return i.complete;
            });
        });
    }, function then() {
        try {
            this.captureSelector(componentPath + 'screenshot.png', className);
            console.log('组件 ' + componentName + ' 截屏成功');
        } catch (err) {
            console.log('出错啦 =>', err);
        } finally {
            nextPage();
        }
    });
};

var nextPage = function nextPage() {
    casper.then(function () {
        if (count < data.length) {
            handlePage(data, count);

            count++;
        }
    });
};

nextPage();

casper.run();