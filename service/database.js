const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('fpi');
const typeCollection = db.collection('types');
const recordCollection = db.collection('records');
const userCollection = db.collection('user');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function add_user(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    // contribution: 0
  };
  await userCollection.insertOne(user);

  return user;
}

async function get_user_by_username(username) {
    return userCollection.findOne({ username: username });
}

async function get_user_by_token(token) {
    return userCollection.findOne({ token: token });
}

async function get_types() {
    const cursor = typeCollection.find();
    return cursor.toArray();
}

async function get_record(type = null) {
    const query = type ? { type: type } : {};
    const options = {
      limit: 1,
    };
    const cursor = recordCollection.find(query, options);
    let ans = await cursor.toArray();
    return ans.length ? ans[0] : null;
}

async function update_record(user, record) {
    let item = {
        user: user,
        results: record.results
    };
    let query = { _id: new ObjectId(record._id) };
    await recordCollection.updateOne(
        query,
        {
            $push: {
                resultsList: item
            }
        }
    );
}

// Admin functions not called by the frontend:

async function add_type(type) {
    await typeCollection.insertOne(type);
}

async function add_record(record) {
    console.log(record);
    await recordCollection.insertOne(record);
}

async function clear() {
    await Promise.all([
        typeCollection.deleteMany({}),
        recordCollection.deleteMany({}),
        userCollection.deleteMany({})
    ]);
}

module.exports = {
    add_user,
    get_user_by_username,
    get_user_by_token,
    get_types,
    get_record,
    update_record,
    add_type,
    add_record,
    clear
};
