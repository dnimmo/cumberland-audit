const prefix = value => value < 10 ? '0' : ''

const getTime = () => {
  const date = new Date()

  var hour = date.getHours()
  hour = `${prefix(hour)}${hour}`
  var minutes = date.getMinutes()
  minutes = `${prefix(minutes)}${minutes}`
  var seconds = date.getSeconds()
  seconds = `${prefix(seconds)}${seconds}`

  return `${hour}:${minutes}:${seconds}`
}

const getDate = () => {
  const date = new Date()

  var day = date.getDate()
  day = `${prefix(day)}${day}`
  var month = date.getMonth() + 1
  month = `${prefix(month)}${month}`
  var year = date.getFullYear()

  return `${year}/${month}/${day}`
}

const generateTimestamp = () => `${getTime()} ${getDate()}`

const sanitise = param => param.replace(/[^a-zA-Z0-9]/g, '')

module.exports = {
  getTime,
  getDate,
  generateTimestamp,
  sanitise
}
