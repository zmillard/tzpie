const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const workDir = process.cwd();

function getTimezones(version) {
  return new Promise((resolve, reject) => {
    const timeZoneFile = path.join(workDir, 'data', version, `${version}.json`);

    fs.readFile(timeZoneFile, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      const { zones } = JSON.parse(data);

      resolve(zones);
    })
  });
}

async function run(version) {
  const zones = await getTimezones(version);

  for await (let zone of zones) {
    const { name, untils, offsets } = zone;
    const fileName = zone.name.toLowerCase()
      .replace('_', '-')
      .split('/')
      .join('-') + '.json';


    const dataPath = path.join(workDir, 'data', version, 'zones');

    fs.mkdirSync(dataPath, { recursive: true });
    fs.writeFile(
      `${path.join(dataPath, fileName)}`,
      JSON.stringify({ name, untils, offsets }, null, 2),
      (err) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }
}

run(pkg.ianaVersion);
