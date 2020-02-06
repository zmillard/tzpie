const pad = require('./pad');

function padDateTimeValues({ day, month, minutes, seconds, hours }) {
  return {
    day: pad(day),
    month: pad(month),
    minutes: pad(minutes),
    seconds: pad(seconds),
    hours: pad(hours)
  }
}

module.exports = padDateTimeValues;