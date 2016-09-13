const test = require('tape')
const { record, retrieve } = require('../cumberland')

test('Should be able to record data', t => {
  const result = record({action: 'test', user: 'test-user'})
  t.equal(result.user, 'test-user')
  t.end()
})

test('Should be able to retrieve data', t => {
  record({action: 'test', user: 'test-user-2'})
  record({action: 'test', user: 'test-user-2'})
  const results = retrieve(user: 'test-user-2')

  t.equal(results.length, 2)
  t.end()
})
