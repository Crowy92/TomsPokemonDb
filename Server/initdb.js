const { MongoClient } = require('mongodb')
const connectionUrl = process.env.DB_CONNECTION;
// const connectionUrl = "mongodb://127.0.0.1:27017/doggos"

const dbName = process.env.DB_NAME

const init = async () => {
  let client = await MongoClient.connect(connectionUrl)
  console.log('connected to database!', dbName)
  return client.db(dbName)
  // return client.db()
}


module.exports = { init };