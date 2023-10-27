
let loggedIn = false;

function init() {
    document.getElementById("loginLink").addEventListener("click", logout);
    renderLogin();

    document.querySelector(".toggle-popup").addEventListener("click", showNotice);
    document.querySelector(".notification").addEventListener("focusout", hideNotice);
    setupWebsocket();
}

// Login Support

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

