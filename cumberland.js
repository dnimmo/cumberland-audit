const { MongoClient } = require('mongodb')
const { generateTimestamp, sanitise } = require('./common-functions')

const cumberland = dbUrl => {
  const fill = (data = {action: 'unknown', user: 'unknown'}) => {
    const {action, user} = data
    const sanitisedAction = sanitise(action)

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(sanitisedAction)
      collection.insert({
        user,
        timestamp: generateTimestamp()
      })

      db.close()
    })

    return data
  }

  const chomp = (data = {action: 'unknown', user: 'unknown'}, query = {}, callback = data => console.log(data)) => {
    const {action} = data
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
