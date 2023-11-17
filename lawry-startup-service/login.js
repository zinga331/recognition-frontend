async function _login_or_register_helper(path) {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!username) {
        alert("Username cannot be blank!");
        return;
    }
    if (!password) {
        alert("Password cannot be blank!");
        return;
    }
    
    let res = await fetch(path, {
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
    } else if (res.msg) {
        alert(res.msg);
    }
}

async function login() {
    _login_or_register_helper("/api/login");
}

async function register() {
    _login_or_register_helper("/api/register");
}

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("registerButton").addEventListener("click", register);
