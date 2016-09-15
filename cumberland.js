const { MongoClient } = require('mongodb')
const { getTime, getDate, sanitise } = require('./common-functions')

const cumberland = (dbUrl, dbName) => {
  const fill = (data = {action: 'unknown', user: 'unknown'}) => {
    const dataToInsert = Object.assign(data, {date: getDate(), time: getTime()})

    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(sanitise(dbName))
      collection.insert(dataToInsert)

      db.close()
    })

    return data
  }

  const chomp = (data = {}, callback = data => console.log(data)) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) console.log(err)
      const collection = db.collection(sanitise(dbName))
      collection.find(data).toArray((err, docs) => err ? console.log(err) : callback(docs))

      db.close()
    })
  }

  return {
    fill,
    chomp
  }
}

module.exports = cumberland
