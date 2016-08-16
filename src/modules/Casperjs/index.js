import casperInit from 'casper';
import fs from 'fs';
const file = '/tmp/data.json';
const data = JSON.parse(fs.read(file));
const options = JSON.parse(fs.read('/tmp/options.json'));
let count = 0;

const casper = casperInit.create({
    viewportSize: {width: 320, height: 480},
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
    }
});

// casper.on('remote.message', function(msg) {
//     this.echo('remote message caught: ' + msg);
// });

casper.start();

/**
 * 打开登录页面
 */

if (options.needLogin) {
	casper.thenOpen(options.loginUrl);

	/**
	 * 填写登录信息
	 */
	casper.then(function(){
	    this.evaluate(() => {
	        let event = new Event('input', { bubbles: true });
	        document.getElementsByName("username")[0].value="13726508066";
	        document.getElementsByName("username")[0].dispatchEvent(event);
	        document.getElementsByName("password")[0].value="11111";
	        document.getElementsByName("password")[0].dispatchEvent(event);
	        document.getElementsByClassName('btn_highlight')[0].click();
	    });
	});

	casper.wait(3000, () => {
	    console.log("正在登录...");
	});
}

let handlePage = (data, count) => {
    let elem = data[count],
        url = elem.url,
        className = '.' + elem.className,
        componentPath = elem.componentPath,
        componentName = elem.componentName;
        
    casper.thenOpen(url);

    casper.waitFor(function check() {
        return this.evaluate(function() {
            var images = document.getElementsByTagName('img');
            return Array.prototype.every.call(images, function(i) { return i.complete; });
        });
    }, function then() {
        try {
            this.captureSelector(componentPath + 'screenshot.png', className);
            console.log('组件 ' + componentName + ' 截屏成功');
        } catch(err) {
            console.log('出错啦 =>', err);
        } finally {
            nextPage();
        }
    });
}

let nextPage = () => {
    casper.then(() => {
        if (count < data.length) {
            handlePage(data, count);

            count++;
        }
    })
}

nextPage();

casper.run();

