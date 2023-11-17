import { getTypes, getRecord, submitRecord, getQuote } from "./service.js";

window.onload = init;

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
  console.log("init() called");

  addButtonListener("addRow", addRow);
  addButtonListener("submitTable", submitTable);
  addButtonListener("logout-button", logout);

  const optgroup = document.getElementById("optgroup");
  // const img = document.querySelector('img');

  optgroup.addEventListener("change", () => {
    console.log("change event fired");
    const selectedOption =
      optgroup.options[optgroup.selectedIndex].parentNode.label;
    console.log(selectedOption);
    loadIndexDocument();
  });
  const initialize = async () => {
    await showDialog();
    await loadTypes();
    await loadIndexDocument();
  };

  initialize();
  renderLogin();

  //Set up websocket notifications
  addButtonListener("notification-button", showNotice);
  document
    .querySelector(".notification")
    .addEventListener("focusout", hideNotice);
  setupWebsocket();
}

let loggedIn = false;

function renderLogin() {
  let username = localStorage.getItem("username");

  if (username) {
    loggedIn = true;
  } else {
    username = "Guest";
    loggedIn = false;
  }

  const userNameElement = document.querySelector(".user-name");
  userNameElement.textContent = username;
}

async function addRow() {
  console.log("addRow() called");
  let table = document.getElementById("documentForm");
  let row = document.createElement("tr");
  row.id = "row" + table.rows.length;

  // Create a new cell for the cross button
  let crossCell = document.createElement("th");
  let cross = document.createElement("span");
  cross.innerHTML = "&#10006;";
  cross.className = "crossButton"; // Set the class name to "crossButton"
  cross.addEventListener("click", () => removeRow(row.id));
  crossCell.appendChild(cross);
  row.appendChild(crossCell); // Append the cross cell to the row

  // Create another new cell for the editable content
  let newCell = document.createElement("th");
  let edit = document.createElement("td");
  edit.textContent = "Edit:";
  edit.contentEditable = true;
  edit.className = "edit";
  newCell.appendChild(edit);
  row.appendChild(newCell); // Append the new cell to the row

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
async function revertTable() {
  console.log("revertTable() called");

  await loadIndexDocument();
  alert("Table Submitted!");
}

// Confirm submission of table, thenn revert table to default state
async function submitTable() {
  console.log("submitTable() called");
  if (!curRecord) return;
  const confirm = window.confirm("Are you sure you want to submit the table?");

  if (confirm) {
    let table = document.getElementById("documentForm");

    let outputFields = [];

    for (const row of table.children) {
      let input = row.querySelector("input");
      let fieldName = row.id
        ? row.querySelector("th").textContent
        : row.querySelector("td").textContent;
      outputFields.push({
        field: fieldName,
        value: input.value,
      });
    }
    curRecord.results = outputFields;
    console.log("curRecord being submitted", curRecord);
    await submitRecord(curRecord);
    console.log("Table submitted");

    revertTable();
  }
}

async function logout() {
  console.log("logout() called");
  if (loggedIn) {
    localStorage.removeItem("username");
    await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  window.location.href = "index.html";
}
// getTypes and populate the optgroup with the grabbed types
async function loadTypes() {
  let types = await getTypes();
  let select = document.getElementById("optgroup");
  select.innerHTML = "";

  let languages = [...new Set(types.map((type) => type.language))];

  languages.forEach((language) => {
    let optgroup = document.createElement("optgroup");
    optgroup.label = language;

    types
      .filter((type) => type.language === language)
      .forEach((type) => {
        let option = document.createElement("option");
        option.value = type.id;
        option.textContent = type.display;
        optgroup.appendChild(option);
      });

    select.appendChild(optgroup);
  });
}

// Get the record from the server and display it
let curRecord = null;
let addedFields = 0;

async function loadIndexDocument() {
  let select = document.getElementById("optgroup");
  let type = select.options[optgroup.selectedIndex].parentNode.label;
  // set the text of select to be lowercase, to match what the server expects
  type = type.toLowerCase();
  console.log(type);
  curRecord = await getRecord(type);

  if (curRecord == null) {
    window.alert("There are no records of that type available!");
    return;
  }

  document.getElementById("recordImage").src = curRecord.imageURL;

  let table = document.getElementById("documentForm");

  table.innerHTML = "";

  curRecord.fields.forEach((field) => {
    let row = document.createElement("tr");

    let labelCell = document.createElement("td");
    labelCell.textContent = field.field;
    row.appendChild(labelCell);

    let inputCell = document.createElement("td");
    let input = document.createElement("input");
    input.type = "text";
    input.id = field.field;
    input.value = field.value;
    inputCell.appendChild(input);
    row.appendChild(inputCell);

    table.appendChild(row);
  });

  addedFields = 0;
}

// Interface WebSocket Notifications
let hideNoticeTimer;
function setupWebsocket() {
  let username = localStorage.getItem("username");
  setTimeout(
    async () =>
      notify(
        "You've got to stay motivated, " +
          username +
          '! "' +
          (await getQuote()) +
          '"'
      ),
    1000
  );
  setTimeout(
    async () =>
      notify(
        "Remember what that one person said, " +
          username +
          ': "' +
          (await getQuote()) +
          '"'
      ),
    10000
  );
  setTimeout(
    async () =>
      notify(
        "I can hardly believe how amazing you are, " +
          username +
          '! "' +
          (await getQuote()) +
          '"'
      ),
    20000
  );
  setTimeout(
    async () =>
      notify(
        "You're done it, " +
          username +
          "! Here's a quote to celebrate: \"" +
          (await getQuote()) +
          '"'
      ),
    30000
  );
}

function notify(text) {
  // Check if the notifications settings radio group is set to "receive". If not, return.
  let radio = document.querySelector('input[name="notification"]:checked');
  if (!radio || radio.value != "receive") return;

  let notice = document.querySelector(".notification");
  notice.textContent = text;
  notice.style.display = "block";

  if (hideNoticeTimer) clearTimeout(hideNoticeTimer), (hideNoticeTimer = null);
  hideNoticeTimer = setTimeout(hideNotice, 2000);
}
async function showDialog() {
  const result = window.confirm("Opt-in to receive notifications?");
  if (result) {
    document.getElementById("opt-in").click();
  } else {
    document.getElementById("opt-out").click();
  }
}

function showNotice() {
  let notice = document.querySelector(".notification");
  notice.style.display = "block";
  notice.focus();
}

function hideNotice() {
  if (hideNoticeTimer) clearTimeout(hideNoticeTimer), (hideNoticeTimer = null);
  let notice = document.querySelector(".notification");
  notice.style.display = "none";
}
