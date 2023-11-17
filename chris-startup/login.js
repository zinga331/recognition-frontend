// Get the submit and register buttons from the DOM
const submitButton = document.getElementById("submit-button");
const registerButton = document.getElementById("register-button");

// Add event listeners to the buttons
submitButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);

// Function to handle form submission
function handleLogin(event) {
  event.preventDefault();
  login();
}

// Function to handle registration
async function handleRegister(event) {
  console.log("handleRegister() called");

  event.preventDefault();
  await register();
}

async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  res = await res.json();

  if (res.username) {
    localStorage.setItem("username", username);
    window.location.href = "home.html";
  }
}
async function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let errorMessage = "";

  if (username.length < 3) {
    errorMessage += "Username must be at least 3 characters.\n";
  }

  if (password.length < 3) {
    errorMessage += "Password must be at least 3 characters.\n";
  }

  if (errorMessage) {
    alert(errorMessage);
    return;
  }
  let res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  res = await res.json();
  console.log(res);
  console.log(res.username);
  if (res.username) {
    localStorage.setItem("username", username);
    window.location.href = "home.html";
  } else {
    alert("That username is unavailable");
  }
}
