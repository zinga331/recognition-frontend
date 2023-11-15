// Initializes the database with dummy data

const db = require("./database.js");

let types = [
  {
    id: "french",
    language: "French",
    display: "French 1820 Records",
  },
  {
    id: "french2",
    language: "French",
    display: "1900 Obituary",
  },
  {
    id: "french3",
    language: "French",
    display: "1900 Census",
  },
  {
    id: "spanish",
    language: "Spanish",
    display: "1950 Baptism",
  },
  {
    id: "spanish2",
    language: "Spanish",
    display: "1960 Census",
  },
  {
    id: "english",
    language: "English",
    display: "2000 Census",
  },
  {
    id: "english2",
    language: "English",
    display: "1950 Marriage Records",
  },
  {
    id: "finnish",
    language: "Finnish",
    display: "Finnish 1770 Records",
  },
];

let records = [
  "images/example.png",
  "images/example2.png",
  "images/example3.png",
  "images/example4.png",
];

let langs = ["french", "finnish", "spanish", "english"];

let fieldMock = [
  [
    {
      field: "Person's Name",
      value: "Jean-Luc",
    },
    {
      field: "Record Date",
      value: "07/01/1819",
    },
    {
      field: "Record Location",
      value: "Bellefontaine-les-Champs",
    },
    {
      field: "Mother's Name",
      value: "Marie-Claire",
    },
    {
      field: "Father's Name",
      value: "Pierre Dupont",
    },
  ],
  [
    {
      field: "Person's Name",
      value: "Matti Virtanen",
    },
    {
      field: "Record Date",
      value: "23/05/1805",
    },
    {
      field: "Record Location",
      value: "Helsinki",
    },
    {
      field: "Mother's Name",
      value: "Anna Kallio",
    },
    {
      field: "Father's Name",
      value: "Juhani Virtanen",
    },
  ],
  [
    {
      field: "Person's Name",
      value: "Elena García",
    },
    {
      field: "Record Date",
      value: "10/11/1798",
    },
    {
      field: "Record Location",
      value: "Barcelona",
    },
    {
      field: "Mother's Name",
      value: "Carmen Rodríguez",
    },
    {
      field: "Father's Name",
      value: "Luis García",
    },
  ],
  [
    {
      field: "Person's Name",
      value: "James Smith",
    },
    {
      field: "Record Date",
      value: "02/04/1780",
    },
    {
      field: "Record Location",
      value: "London",
    },
    {
      field: "Mother's Name",
      value: "Elizabeth Johnson",
    },
    {
      field: "Father's Name",
      value: "John Smith",
    },
  ],
];

async function init() {
  console.log("Initializing database...");
  await db.clear();

  await Promise.all(types.map((t) => db.add_type(t)));

  for (let i = 0; i < 4; ++i) {
    let record = {
      type: langs[i],
      imageURL: records[i],
      fields: fieldMock[i],
      resultsList: [],
    };
    await db.add_record(record);
  }
}

init();
