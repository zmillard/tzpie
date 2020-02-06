// get the current time for a given time zone
function getCurrentDateTimeObject(zone) {
  const now = Date.now();
  let index = zone.offsets.length - 1;

  for (let i = 0; i < zone.untils.length; i++) {
    if (now <= zone.untils[i]) {
      index = i;
      break;
    }
  }

  const offset = zone.offsets[index];
  const time = new Date(now - offset * 60 * 1000);

  const year = time.getUTCFullYear();

  // extract out to a function that will get these values and return an object with them
  let day = time.getUTCDate();
  let month = time.getUTCMonth() + 1;
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds();
  let hours = time.getUTCHours();

  // object with datetime values
  return {
    day,
    month,
    minutes,
    seconds,
    hours,
    year,
    offset
  };
}

module.exports = getCurrentDateTimeObject;