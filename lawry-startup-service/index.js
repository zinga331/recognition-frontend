let api = window.api;

function init() {
    document.getElementById("loginLink").addEventListener("click", logout);
    renderLogin().catch(console.error);
    
    document.querySelector(".toggle-popup").addEventListener("click", showNotice);
    document.querySelector(".notification").addEventListener("focusout", hideNotice);
    setupWebsocket();

    loadTypes().then(getRecord);
    document.getElementById("datasets").addEventListener("change",getRecord);

    document.getElementById("addField").addEventListener("click",addField);
    document.getElementById("submit").addEventListener("click",submitRecord);
    addQuote();
}

async function addQuote() {
    let quote = await api.getQuote();
    document.querySelector(".quote").textContent = quote;
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
let addedFields = 0;
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

    addedFields = 0;
}

async function removeField(fieldID) {
    let row = document.getElementById(fieldID);
    row.parentNode.removeChild(row);
}

async function addField() {
    let fieldID = 'addedField' + (++addedFields);
    let table = document.getElementById("indexFields");

    let row = document.createElement('tr');
    row.id = fieldID;
    
    let labelCell = document.createElement('td');

    let del = document.createElement('span');
    del.innerHTML = '&#10006; ';
    del.addEventListener("click",() => removeField(fieldID));
    labelCell.appendChild(del);

    let editable = document.createElement('span');
    editable.textContent = 'Click to Edit';
    editable.contentEditable = true;
    editable.className = 'edit';
    labelCell.appendChild(editable);

    row.appendChild(labelCell);

    let inputCell = document.createElement('td');
    let input = document.createElement('input');
    input.type = "text";
    inputCell.appendChild(input);
    row.appendChild(inputCell);

    table.appendChild(row);

}

async function submitRecord() {
    if (!curRecord) return;
    
    let table = document.getElementById("indexFields");

    let outputFields = [];

    for (const row of table.children) {
        let input = row.querySelector(":scope input");
        let fieldName = row.id ? row.querySelector(":scope .edit").textContent : input.id;
        outputFields.push({
            field: fieldName,
            value: input.value
        });
    }

    curRecord.results = outputFields;
    await api.submitRecord(curRecord);

    getRecord();
}

// Login Support

async function renderLogin() {
    let username = await fetch("/api/whoami");
    username = await username.json();
    username = username.username;
    
    if (!username) {
        window.location.href = "login.html";
    }
    
    document.getElementById("userDisplay").textContent = `Hello, ${username}!`;
    document.getElementById("loginLink").textContent = true ? "Logout" : "Login";
}

async function logout() {
    await fetch("/api/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    window.location.href = "login.html";
}

// WebSocket Notifications

let hideNoticeTimer;
function setupWebsocket() {
    // TODO
    // setTimeout(() => notify("You've been on the page for ten seconds"), 10000);
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    console.log(socket);
    socket.onopen = (event) => {
        console.log("Connected");
        //   this.displayMsg('system', 'game', 'connected');
    };
    socket.onclose = (event) => {
        console.log("Disconnected");
        //   this.displayMsg('system', 'game', 'disconnected');
    };
    socket.onmessage = async (event) => {
        console.log("Message");
        const msg = JSON.parse(await event.data.text());
        console.log(msg);
    //   if (msg.type === GameEndEvent) {
    //     this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
    //   } else if (msg.type === GameStartEvent) {
    //     this.displayMsg('player', msg.from, `started a new game`);
    //   }
    };
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

