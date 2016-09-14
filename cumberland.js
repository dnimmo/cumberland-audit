const { MongoClient } = require('mongodb')
const { getTime, getDate, sanitise } = require('./common-functions')

const cumberland = dbUrl => {
  const fill = (data = {action: 'unknown', user: 'unknown'}) => {
    const {action} = data
    const sanitisedAction = sanitise(action)
    const dataToInsert = Object.assign(data, {date: getDate(), time: getTime()})

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(sanitisedAction)
      collection.insert(dataToInsert)

      db.close()
    })

    return data
  }

  const chomp = (data = {action: 'unknown', query: {}}, callback = data => console.log(data)) => {
    const {action, query} = data
    const sanitisedAction = sanitise(action)

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(sanitisedAction)
      collection.find(query).toArray((err, docs) => err ? console.log(err) : callback(docs))

      db.close()
    })
  }

  return {
    fill,
    chomp
  }
}

module.exports = cumberland
