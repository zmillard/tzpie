const path = require("path");
const fs = require('fs');
const validatePackageName = require("validate-npm-package-name");
const pkg = require('../package.json');

const workDir = process.cwd();

const formatTimeZone = tz => tz.replace(/\/|_/g, "-").toLowerCase();


async function buildModules() {
  const zoneDataDirectory = path.join(workDir, 'data', pkg.ianaVersion, 'zones');

  fs.readdir(zoneDataDirectory, (err, files) => {
    if (err) throw new Error(err);

    for (let file of files) {
      const zone = require(`${zoneDataDirectory}/${file}`);

      const moduleName = formatTimeZone(zone.name);

      const { validForNewPackages } = validatePackageName(moduleName);

      if (!validForNewPackages) {
        continue;
      }

      const src = `const zone = ${JSON.stringify(zone)};`;
      console.log(src);
    }
  });
}

module.exports = buildModules;
