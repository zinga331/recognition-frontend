const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('fpi');
const typeCollection = db.collection('types');
const recordCollection = db.collection('records');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function add_user(username, password) {

}

async function get_user(username) {

}

async function get_types() {
    const cursor = typeCollection.find();
    return cursor.toArray();
}

async function get_record(type) {

}

async function update_record(record) {

}

// Admin functions not called by the frontend:

async function add_type(type) {
    await typeCollection.insertOne(type);
}

async function add_record() {
}

async function clear() {

}

module.exports = {
    add_user,
    get_user,
    get_types,
    get_record,
    update_record,
    add_type,
    add_record,
    clear
};
