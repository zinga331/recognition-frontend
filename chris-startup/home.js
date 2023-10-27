let api = window.api;
// Creates a button listener given the function name, and the button id
function addButtonListener(buttonId, listenerFunction) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener("click", listenerFunction);
  } else {
    console.error(`${buttonId} button not found`);
  }
}

function init() {
  console.log('init() called');
  getUsername();

  addButtonListener("addRow", addRow);
  addButtonListener("submitTable", submitTable);

  const optgroup = document.getElementById('optgroup');
  const img = document.querySelector('img');

  optgroup.addEventListener('change', () => {
    console.log('change event fired');
    const selectedOption = optgroup.options[optgroup.selectedIndex].parentNode.label;
    console.log(selectedOption);

    const imgSrc = `images/${selectedOption}.png`;
    img.src = imgSrc;
  });
}

function getUsername() {
    console.log('getUsername() called');
    const username = localStorage.getItem('username');
    const userNameElement = document.querySelector('.user-name');
    if (username != null && username != '') {
      userNameElement.textContent = username;
    } else {
      userNameElement.textContent = 'Guest';
    }
  }
  // Target table documentForm and add a new row
  async function addRow(){
    console.log('addRow() called');
    let table = document.getElementById("documentForm");
    let row = document.createElement("tr");
    row.id = "row" + table.rows.length;

    let newCell = document.createElement("td");
    let cross = document.createElement("span");
    cross.innerHTML = '&#10006;'; // ADD a cross symbol to be used to remove the row later.
    cross.addEventListener("click",() => removeRow(row.id));


    newCell.appendChild(cross);
    let edit = document.createElement("th");
    edit.textContent = "Edit:";
    edit.contentEditable = true;
    edit.className = "edit"; // UPDATE CLASS NAME
    newCell.appendChild(edit);

    row.appendChild(newCell);
    let inputCell = document.createElement("td");
    let input = document.createElement("input"); 
    input.type = "text";

    inputCell.appendChild(input);
    row.appendChild(inputCell);

    table.appendChild(row);
  }

  async function removeRow(fieldID) {
    let row = document.getElementById(fieldID);
    row.parentNode.removeChild(row);
}
function revertTable() {
  const inputs = document.querySelectorAll('#documentForm input');
  inputs[0].value = 'John Doe';
  inputs[1].value = 'January 1, 2000';
  inputs[2].value = 'New York, NY';
  inputs[3].value = 'Jane Dough';
  inputs[4].value = 'John Doe Sr.';
}

  // create submitTable function, which removes all added rows and reverts the table to its original state, to simulate submitting the table.
  async function submitTable() {
    console.log('submitTable() called');
    let table = document.getElementById("documentForm");
    let rowCount = table.rows.length;
    for (let i = 5; i < rowCount; i++) {
      table.deleteRow(5);
    }
    revertTable();

  }

  // LAWRY'S CODE
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


window.api = {
    getTypes,
    getTypes,
    getRecord
};

// function getUsername() {
//     const username = localStorage.getItem('username');
//     const userNameElement = document.querySelector('.user-name');
//     if (username) {
//       userNameElement.textContent = username;
//     } else {
//       userNameElement.textContent = 'Guest';
//     }
//   }