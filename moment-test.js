const fs = require("fs");
const path = require("path");
const workDir = process.cwd();
const moment = require("moment-timezone");
const pkg = require('./package.json');

const getCurrentDateTimeObject = require('./src/getCurrentDateTimeObject');
const getISOString = require('./src/getISOString');

let same = 0;
let different = 0;

const zoneDataDirectory = path.join(workDir, 'data', pkg.ianaVersion, 'zones');

// get a list of all files in the zone data directory
fs.readdir(zoneDataDirectory, (err, files) => {
  if (err) throw new Error(err);

  // loop over each file
  files.forEach(file => {
    // require the file's json data so we have it as a JS object
    const zone = require(`${zoneDataDirectory}/${file}`);

    let momentDateTime = moment().tz(zone.name)

    const currentDateTimeObject = getCurrentDateTimeObject(zone);
    const isoString = getISOString(currentDateTimeObject);

    // can use https://www.travelmath.com/time-zone/Pacific/Chatham to verify correct offset & time
    if (momentDateTime.format() !== isoString) {
      different++
      console.log("=========")
      console.log(zone.name);
      console.log(momentDateTime.format(), '<--- moment');
      console.log(isoString, '<--- tzpie');
    } else {
      same++
    }
  });
  console.log('same', same);
  console.log('different', different);
})