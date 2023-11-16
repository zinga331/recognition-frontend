const express = require("express");
const db = require("./database.js");
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
// Create a new endpoint under the /api path for the service to handle requests to /api/login. Print the received username and password to the console.
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// login
apiRouter.post("/login", (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  console.log(`Username: ${username}, Password: ${password}`);
  res.send(req.body);
});

// register
apiRouter.post("/register", (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  console.log(`Username: ${username}, Password: ${password}`);
  res.send(req.body);
});

// get types
apiRouter.get("/types", async (_req, res) => {
  res.send(await db.get_types());
});

// get image
apiRouter.get("/record", async (req, res) => {
  let type = req.query.type;
  let ans = await db.get_record(type);
  res.send(ans);
});

// submit form
apiRouter.put("/record", async (req, res) => {
  let record = req.body;
  let user = "anon";
  await db.update_record(user, record);
  res.send(200);
});
// Sample code from simon-login
/*
(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    document.querySelector('#playerName').textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#userName')?.value;
  const password = document.querySelector('#userPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function play() {
  window.location.href = 'play.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
  let scores = [];
  // See if we have a user with the given email.
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}

*/
