
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    localStorage.setItem("username", username);
    window.location.href = "index.html";
}

function register() {
    login(); // TODO: replace
}

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
