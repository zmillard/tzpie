const fs = require("fs");
const prettier = require("prettier");

const pkg = require('../package.json');

const makePkg = (moduleName, description) =>
  `{
  "name": "${`@tzpie/${moduleName}`}",
  "version": "0.0.1",
  "ianaVersion": ${pkg.ianaVersion},
  "description": "${description}",
  "author": "Ryan Hinchey <rlhinchey@gmail.com> (http://twitter.com/ryhinchey)",
  "license": "MIT",
  "main": "lib/index.js",
  "files": [
    "lib"
  ],
  "scripts": {
    "build": "rollup -c './rollup.config.js'"
  },
  "keywords": [
    "tz,timezones"
  ]
}`;

function writeModule(path, src, moduleName, description) {
  fs.mkdirSync(path, { recursive: true });

  fs.writeFileSync(
    `${path}/index.js`,
    prettier.format(src, { parser: "babel" })
  );

  fs.writeFileSync(`${path}/package.json`, makePkg(moduleName, description));

  fs.writeFileSync(
    `${path}/README.md`,
    `
    # @tzpie/${moduleName}

    > ${moduleName} timezone library

    ## Usage
    `
  );
}

function addModules(modules) {
  for (let i = 0; i < modules.length; i++) {
    const { tz, path, moduleName, src } = modules[i];
    const description = `${tz} timezone library`;

    writeModule(path, src, moduleName, description);
  }
}

module.exports = addModules;
