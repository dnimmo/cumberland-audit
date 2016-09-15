# cumberland-audit
Cumberland Audit is a flexible auditing solution for recording system actions.  You can create an entry for any action along with a user id and query the information for reporting purposes.
```
npm install cumberland-audit
```

## Dependencies
You will need a MongoDB service running on the environment you are using cumberland-audit from.  Setup instructions can be found on the MongoDB website:  https://docs.mongodb.com/manual/administration/install-community/
Once you have a MongoDB location, this must be passed in to cumberland-audit when initializing, along with a database name:
```
const dbUrl = `mongodb://localhost:27017/cumberland-test`
const dbName = 'test-database'
const cumberland = require('../cumberland')(dbUrl, dbName)
```
You can have multiple dbNames on the same db to allow for testing.  They will be handles as separate MongoDB collections.

## Usage
cumberland-audit has two functions, `fill` and `chomp`:

### fill
```
cumberland.fill({action: 'login', user: 'test-user-1'})
```
*Parameters:*
- *action (String)(required)*: The system action to record
- *user (String)(required)*: The user identifier
- *{custom} (optional)*: Add as many custom variables to store as you like, to record information on the system action.  For example the fields that changed in the system action.

### chomp
```
const options = {action: 'login', query: {user: 'test-user-1'}}
cumberland.chomp(options, function(results) { ... })
```
*Parameters:*
- *options*
- *action (String)(required)*: The system action to search for
- *query (Object)(optional)*
- *user*: User identifier to search for
