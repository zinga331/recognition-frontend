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
]

async function getTypes() {
    return types;
}

async function getRecord(type) {
    if (type != 'french') return null;
    let ri = Math.floor(Math.random() * records.length);
    let fi = Math.floor(Math.random() * fieldMock.length);
    return {
        id: 'abcdef',
        imageURL: records[ri],
        fields: fieldMock[fi]
    };
}

async function submitRecord(record) {
    console.log("Submitting record:", record);
}

window.api = {
    getTypes,
    getTypes,
    getRecord,
    submitRecord
};