// Include mongoDB
const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const collection = client.db("authTest").collection("user");

// Express server
const express = require("express");
const app = express();

app.use(express.json());

// Endpoints

app.post("/auth/login", async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// Create endpoint
app.post("/auth/create", async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    res.send({
      id: user._id,
    });
  }
});

// Database functions
function getUser(email) {
  return collection.findOne({ email: email });
}

const uuid = require("uuid");

const bcrypt = require("bcrypt");

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await collection.insertOne(user);

  return user;
}

const cookieParser = require("cookie-parser");

// Use the cookie parser middleware
app.use(cookieParser());

app.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

function setAuthCookie(res, authToken) {
  res.cookie("token", authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}
// But, we are missing a couple of things. We need a real authentication token, and we cannot simply store a clear text password in our database.
// User endpoints

app.get("/user/me", async (req, res) => {
  authToken = req.cookies["token"];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// Get user endpoint, listen
const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
