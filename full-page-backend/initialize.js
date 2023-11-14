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

db.clear();

types.map(t => db.add_type(t));

records.forEach(rec => {
    // fieldMock
});