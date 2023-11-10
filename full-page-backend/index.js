const express = require('express');
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
let types = [
    {
        id: "french",
        language: "French",
        display: "French 1820 Records"
    },
    {
        id: "french2",
        language: "French",
        display: "1900 Obituary"
    },
    {
        id: "finnish",
        language: "Finnish",
        display: "Finnish 1770 Records"
    }
];
apiRouter.get('/types', (_req, res) => {
    res.send(types);
});

// get image
let records = ["images/example.png", "images/example2.png", "images/example3.png", "images/example4.png"];

let fieldMock = [
    [
        {
            field: "Person's Name",
            value: "Jean-Luc"
        },
        {
            field: "Record Date",
            value: "07/01/1819"
        },
        {
            field: "Record Location",
            value: "Bellefontaine-les-Champs"
        },
        {
            field: "Mother's Name",
            value: "Marie-Claire"
        },
        {
            field: "Father's Name",
            value: "Pierre Dupont"
        }
    ],
    [

        {
            field: "Person's Name",
            value: "Isabelle Dubois"
        },
        {
            field: "Record Date",
            value: "14/03/1821"
        },
        {
            field: "Record Location",
            value: "Saint-Étienne-sur-Mer"
        },
        {
            field: "Mother's Name",
            value: "Sophie Martin"
        },
        {
            field: "Father's Name",
            value: "François Leblanc"
        }
    ]
];
apiRouter.get('/record', (req, res) => {
    let type = req.query.type;
    if (type != 'french' && type != 'spanish') return res.send({error: "No records available"});
    let ri = Math.floor(Math.random() * records.length);
    let fi = Math.floor(Math.random() * fieldMock.length);
    let ans = {
        id: 'abcdef',
        imageURL: records[ri],
        fields: fieldMock[fi]
    };
    res.send(ans);
});

// submit form
apiRouter.put('/record', (req, res) => {
    let record = req.body;
    console.log(record);
    res.send(200);
});