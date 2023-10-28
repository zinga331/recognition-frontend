// Creates a button listener given the function name, and the button id
function addButtonListener(buttonId, listenerFunction) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener("click", listenerFunction);
  } else {
    console.error(`${buttonId} button not found`);
  }
}

async function init() {
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
    await showDialog();

    //Set up websocket notifications
    addButtonListener("notification-button", showNotice);
    document.querySelector(".notification").addEventListener("focusout", hideNotice);
    setupWebsocket();
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
    return userNameElement.textContent;
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
function revertTable() {    let table = document.getElementById("documentForm");

  let rowCount = table.rows.length;
  for (let i = 5; i < rowCount; i++) {
    table.deleteRow(5);
  }
  
  const inputs = document.querySelectorAll('#documentForm input');
  inputs[0].value = 'John Doe';
  inputs[1].value = 'January 1, 2000';
  inputs[2].value = 'New York, NY';
  inputs[3].value = 'Jane Dough';
  inputs[4].value = 'John Doe Sr.';
  // Display a dialog message letting the user know the table has been submitted.
  alert("Table Submitted!");
}

  // Confirm submission of table, thenn revert table to default state
  async function submitTable() {
    console.log('submitTable() called');
    const confirm = window.confirm("Are you sure you want to submit the table?");

    if (confirm) {
      console.log('Table submitted');
      revertTable();
    }

  }

  async function logout() {
    console.log('logout() called');
    localStorage.setItem('username', '');
    window.location.href = 'index.html';
  }

  // Interface WebSocket Notifications
  let hideNoticeTimer;
  function setupWebsocket() {
    setTimeout(() => notify("You've got to do the thing, " + getUsername() + "!"), 1000);
    setTimeout(() => notify("Goodness, you're doing well " + getUsername() + "!"), 10000);
    setTimeout(() => notify("I can hardly believe how amazing you are, " + getUsername() + "!"), 20000);
    setTimeout(() => notify("You've done the thing, " + getUsername() + "!"), 30000);
    // Fill out real websocket code here
}

function notify(text) {
    // Check if the notifications settings radio group is set to "receive". If not, return.
    let radio = document.querySelector('input[name="notification"]:checked');
    if (!radio || radio.value != "receive") return;

    let notice = document.querySelector(".notification");
    notice.textContent = text;
    notice.style.display = 'block';
    
    if (hideNoticeTimer) clearTimeout(hideNoticeTimer),hideNoticeTimer=null;
    hideNoticeTimer = setTimeout(hideNotice, 2000);
}
async function showDialog() {
  const result = window.confirm('Opt-in to receive notifications?');
  if (result) {
    document.getElementById('opt-in').click();
  } else {
    document.getElementById('opt-out').click();
  }
}

function showNotice() {
    let notice = document.querySelector(".notification");
    notice.style.display = 'block';
    notice.focus();
}

function hideNotice() {
    if (hideNoticeTimer) clearTimeout(hideNoticeTimer),hideNoticeTimer=null;
    let notice = document.querySelector(".notification");
    notice.style.display = 'none';
}



