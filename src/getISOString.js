const padDateTimeValues = require('./padTimeValues');

// formatting to create ISO 8601 (no fractional seconds) date string
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
function getISOString({ year, offset, ...rest }) {
  const {
    day,
    month,
    minutes,
    seconds,
    hours,
  } = padDateTimeValues(rest);

  let offsetHours = offset / 60.0;

  if (offsetHours % 1 !== 0) {
    const pieces = String(offsetHours).split('.');
    offsetHours = parseFloat(`${pieces[0]}.${pieces[1] * 60}}`);
  }

  let isoString;

  if (offsetHours === 0) {
    isoString = (`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`)
  } else {
    let normalizedOffset = -offsetHours;

    const pieces = String(normalizedOffset).split('.');

    if (pieces.length > 1) {

      const isNegative = pieces[0].startsWith('-');

      if (isNegative) {
        let first = pieces[0].replace('-', '')

        let second = pieces[1]

        if (first.length < 2) {
          first = `0${first}`;
        }

        if (second.length < 2) {
          second = `0${second}`
        }

        normalizedOffset = `${first}.${second}`
        // console.log(normalizedOffset)
      } else {
        let first = pieces[0]
        let second = pieces[1]

        if (first.length < 2) {
          first = `0${first}`;
        }

        if (second.length < 2) {
          second = `0${second}`
        }
        normalizedOffset = `${first}.${second}`
        // console.log(normalizedOffset)
      }
    }
    if (parseFloat(normalizedOffset) < 0) {
      isoString = (`${year}-${month}-${day}T${hours}:${minutes}:${seconds}-${normalizedOffset}:00`)
    } else {
      isoString = (`${year}-${month}-${day}T${hours}:${minutes}:${seconds}+${normalizedOffset}:00`)
    }
  }

  return isoString;
}

module.exports = getISOString;