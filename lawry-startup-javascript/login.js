
async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password })
    });
    
    res = await res.json();

    if (res.username) {
        localStorage.setItem("username", username);
        window.location.href = "index.html";
    }
}

function register() {
    login(); // TODO: replace
}

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
