const { MongoClient } = require('mongodb')
const { generateTimestamp } = require('./common-functions')

const cumberland = appName => {
  const dbUrl = `mongodb://0.0.0.0:27017/${appName}`

  const record = data => {
    const {action, user} = data
    // handle hyphens in action

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(action)
      collection.insert({
        user,
        timestamp: generateTimestamp()
      })

      db.close()
    })
    return data
  }

  const retrieve = (data, callback) => {
    const {action} = data
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(action)
      collection.find({}).toArray((err, docs) => err ? console.log(err) : callback(docs))
      db.close()
    })
  }

  return {
    record,
    retrieve
  }
}

module.exports = cumberland
