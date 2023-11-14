const express = require('express');
const db = require('./database.js');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// Create a new endpoint under the /api path for the service to handle requests to /api/login. Print the received username and password to the console.
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// login
apiRouter.post('/login', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Username: ${username}, Password: ${password}`);
    res.send(req.body);
});

// register
apiRouter.post('/register', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    console.log(`Username: ${username}, Password: ${password}`);
    res.send(req.body);
});

// get types
apiRouter.get('/types', async (_req, res) => {
    res.send(await db.get_types());
});

// get image
apiRouter.get('/record', async (req, res) => {
    let type = req.query.type;
    res.send(await db.get_record(type));
});

// submit form
apiRouter.put('/record', (req, res) => {
    let record = req.body;
    console.log(record);
    res.send(200);
});