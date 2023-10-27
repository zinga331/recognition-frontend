let types = [
    {
        id: "french",
        display: "French 1820 Records"
    },
    {
        id: "finnish",
        display: "Finnish 1770 Records"
    }
];

let records = ["example.png", "example2.png", "example3.png", "example4.png"];

let fieldMock = [
    {
        field: "Person's Name",
        value: "Example Name"
    },
    {
        field: "Record Date",
        value: "DD/MM/YYYY"
    },
    {
        field: "Record Location",
        value: "Commune Name"
    },
    {
        field: "Mother's Name",
        value: "Example Name"
    },
    {
        field: "Father's Name",
        value: "Example Name"
    }
]

async function getTypes() {
    return types;
}

async function getRecord(type) {
    if (type != 'french') return null;
    let ri = Math.floor(Math.random() * records.length);
    let url = records[ri];
    return {
        id: 'abcdef',
        imageURL: url,
        fields: fieldMock
    };
}

async function submitRecord(record) {
    console.log("Submitting record:", record);
}

window.api = {
    getTypes,
    getTypes,
    getRecord
};