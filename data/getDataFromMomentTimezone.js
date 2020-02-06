const https = require("https");
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const workDir = process.cwd();

function getData(version) {
  return new Promise((resolve, reject) => {
    const dataUrl = `https://raw.githubusercontent.com/moment/moment-timezone/develop/data/unpacked/${version}.json`;

    const dataDir = path.join(workDir, 'data', version);

    fs.mkdirSync(dataDir, { recursive: true });

    const filePath = path.join(dataDir, `${version}.json`)
    const dataFile = fs.createWriteStream(filePath);

    https.get(dataUrl, req => {
      req.pipe(dataFile);

      req.on('error', e => {
        reject(e);
      });

      req.on('close', resolve);
    });
  })
}

getData(pkg.ianaVersion).then(() => console.log('done!'));