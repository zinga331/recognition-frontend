// Initializes the database with dummy data

const db = require('./database.js');

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
        id: "french3",
        language: "French",
        display: "1900 Census"
    },
    {
        id: "spanish1",
        language: "Spanish",
        display: "1950 Baptism"
    },
    {
        id: "spanish2",
        language: "Spanish",
        display: "1960 Census"
    },
    {
        id: "english1",
        language: "English",
        display: "2000 Census"
    },
    {
        id: "english2",
        language: "English",
        display: "1950 Marriage Records"
    },
    {
        id: "finnish",
        language: "Finnish",
        display: "Finnish 1770 Records"
    }
];

types.map(t => db.add_type(t));



