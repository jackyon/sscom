import fs from 'fs';
import junk from 'junk';

export default function(path) {
	let tempData = [];
	return new Promise ((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				reject(err);
				return;
			}

			let notJunkFiles = files.filter(junk.not);

			for (let file of notJunkFiles) {
				if (!file.includes('.js')) {
					tempData.push(file);
				}
			}

			resolve(tempData);
		});
	})
}