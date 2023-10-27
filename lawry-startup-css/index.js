let api = window.api;

function init() {
    document.getElementById("loginLink").addEventListener("click", logout);
    renderLogin();
    
    document.querySelector(".toggle-popup").addEventListener("click", showNotice);
    document.querySelector(".notification").addEventListener("focusout", hideNotice);
    setupWebsocket();

    loadTypes().then(getRecord);
    document.getElementById("datasets").addEventListener("change",getRecord);

    document.getElementById("addField").addEventListener("click",addField);
}

// API support

async function loadTypes() {
    let data = await api.getTypes();
    let select = document.getElementById("datasets");
    select.innerHTML = '';
    data.forEach(type => {
        let op = document.createElement('option');
        op.value = type.id;
        op.innerText = type.display;
        select.appendChild(op);
    })
}

let curRecord = null;
async function getRecord() {
    let select = document.getElementById("datasets");
    let type = select.value;
    curRecord = await api.getRecord(type);

    if (curRecord == null) {
        window.alert("There are no records of that type available!");
        return;
    }
    
    document.getElementById("recordImage").src = curRecord.imageURL;

    let table = document.getElementById("indexFields");

    table.innerHTML = '';

    curRecord.fields.forEach(field => {
        let row = document.createElement('tr');
        
        let labelCell = document.createElement('td');
        labelCell.textContent = field.field;
        row.appendChild(labelCell);

        let inputCell = document.createElement('td');
        let input = document.createElement('input');
        input.type = "text";
        input.id = field.field;
        input.value = field.value;
        inputCell.appendChild(input);
        row.appendChild(inputCell);

        table.appendChild(row);
    });
    
}

// &#10006;
async function addField() {
    let table = document.getElementById("indexFields");

    let row = document.createElement('tr');
        
    let labelCell = document.createElement('td');
    labelCell.textContent = 'Click to Edit';
    labelCell.contentEditable = true;
    labelCell.className = 'edit';
    row.appendChild(labelCell);

    let inputCell = document.createElement('td');
    let input = document.createElement('input');
    input.type = "text";
    inputCell.appendChild(input);
    row.appendChild(inputCell);

    table.appendChild(row);

}

async function submitRecord() {
}

// Login Support

let loggedIn = false;
function renderLogin() {
    let username = localStorage.getItem("username");
    
    if (username) {
        loggedIn = true;
    } else {
        username = "Anon";
        loggedIn = false;
    }
    
    document.getElementById("userDisplay").textContent = `Hello, ${username}!`;
    document.getElementById("loginLink").textContent = loggedIn ? "Logout" : "Login";
}

function logout() {
    if (loggedIn) {
        localStorage.removeItem("username");
        init();
    } else {
        window.location.href = "login.html";
    }
}

// WebSocket Notifications

let hideNoticeTimer;
function setupWebsocket() {
    // TODO
    setTimeout(() => notify("You've been on the page for ten seconds"), 10000);
}

function notify(text) {
    let notice = document.querySelector(".notification");
    notice.textContent = text;
    notice.style.display = 'block';
    
    if (hideNoticeTimer) clearTimeout(hideNoticeTimer),hideNoticeTimer=null;
    hideNoticeTimer = setTimeout(hideNotice, 6000);
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

window.addEventListener("load", init);

