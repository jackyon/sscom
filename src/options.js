import fs from 'fs';
import jsonfile from 'jsonfile';

let config = jsonfile.readFileSync('/tmp/options.json');
let { screenshotUrl,
	  projectPath, 
	  componentsPath, 
	  containersPath, 
	  routesPath } = config;

export default {
	componentsPath: projectPath + componentsPath,
	containersPath: projectPath + containersPath,
	routesPath: projectPath + routesPath,
	url: screenshotUrl
};