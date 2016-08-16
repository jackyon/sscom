import fs from 'fs';

export default function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, contents) => {
			if (err) {
				reject(err);
				return;
			} else {
				resolve(contents)
			}
		});
	})
}