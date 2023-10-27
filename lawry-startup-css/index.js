
let loggedIn = false;

// Display logged in user
function init() {
    document.getElementById("loginLink").addEventListener("click", logout);
    renderLogin();
}

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

window.addEventListener("load", init);

