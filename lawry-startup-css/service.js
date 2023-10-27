let types = [
    {
        id: "french",
        display: "French 1820 Records"
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
    window.alert("testing 123");
}

async function submitRecord(record) {

}

window.api = {
    getTypes,
    getTypes,
    getRecord
};