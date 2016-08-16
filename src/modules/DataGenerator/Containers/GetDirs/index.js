import GetContainerFiles from '../GetFiles/';

//寻找容器目录
export default function(files, component) {
	return new Promise((resolve, reject) => {
		for (let file of files) {
			GetContainerFiles(file, component)
			.then((results) => {
				resolve(results);
			});
		}
	});
}