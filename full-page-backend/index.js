const express = require("express");
const db = require("./database.js");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// add cookie parser
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// Create a new endpoint under the /api path for the service to handle requests to /api/login. Print the received username and password to the console.
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

const authCookieName = 'token';

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// login
apiRouter.post("/login", async (req, res) => {
  const user = await db.get_user_by_username(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Incorrect username or password' });
});

apiRouter.delete('/logout', (_req, res) => {
  console.log("logging out");
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// register
apiRouter.post("/register", async (req, res) => {
  if (await db.get_user_by_username(req.body.username)) {
    res.status(409).send({ msg: 'Username already exists' });
  } else {
    const user = await db.add_user(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      username: user.username,
    });
  }
});

async function whoami(req) {
  if (!req.cookies) return null;
  let authToken = req.cookies[authCookieName];
  const user = await db.get_user_by_token(authToken);
  return user?.username;
}

// get types
apiRouter.get("/types", async (req, res) => {
  let user = await whoami(req);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.send(await db.get_types());
});

// get image
apiRouter.get("/record", async (req, res) => {
  let user = await whoami(req);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  let type = req.query.type;
  let ans = await db.get_record(type);
  res.send(ans ? ans : { error: "No records of that type are available." });
});

// submit form
apiRouter.put("/record", async (req, res) => {
  let record = req.body;
  let user = await whoami(req);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  await db.update_record(user, record);
  res.status(200).end();
});

// whoami
apiRouter.get("/whoami", async (req, res) => {
  let user = await whoami(req);
  if (!user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.status(200).send({ username: user});
});