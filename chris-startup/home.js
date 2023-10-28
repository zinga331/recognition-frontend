// TODO next: create services.js and implement notifications there.
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
  addButtonListener("logout-button", logout);

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

    let newCell = document.createElement("th");
    let cross = document.createElement("span");
    cross.innerHTML = '&#10006;';
    cross.className = "crossButton"; // Set the class name to "crossButton"
    cross.addEventListener("click",() => removeRow(row.id));

    newCell.appendChild(cross);
    let edit = document.createElement("td");
    edit.textContent = "Edit:";
    edit.contentEditable = true;
    edit.className = "edit";
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
  // Display a dialog message letting the user know the table has been submitted.
  alert("Table Submitted!");
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

  async function logout() {
    console.log('logout() called');
    localStorage.setItem('username', '');
    window.location.href = 'index.html';
  }

  // Interface WebSocket Notifications
  let hideNoticeTimer;
  // let notification = document.getElementById('notification');



