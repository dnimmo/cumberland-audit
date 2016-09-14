const test = require('tape')
const testAppName = 'cumberland-test'
const dbUrl = `mongodb://0.0.0.0:27017/${testAppName}`
const cumberland = require('../cumberland')(dbUrl)
const { MongoClient } = require('mongodb')
const testAction = 'test'

const tearDown = () => {
  MongoClient.connect(dbUrl, (err, db) => {
    if (err) console.log(err)
    db.collection(testAction).remove({})
    db.close()
  })
}

test('Should be able to record data', t => {
  const result = cumberland.fill({action: testAction, user: 'test-user'})

  t.equal(result.user, 'test-user')
  tearDown()
  t.end()
})

test('Should be able to retrieve data', t => {
  cumberland.fill({action: testAction, user: 'test-user-2'})
  cumberland.fill({action: testAction, user: 'test-user-2'})
  cumberland.chomp({action: testAction}, results => {
    t.equal(results.length, 2)
    tearDown()
    t.end()
  })
})
