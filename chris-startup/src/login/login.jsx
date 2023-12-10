import React, { useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    res = await res.json();

    if (res.username) {
      localStorage.setItem("username", username);
      window.location.href = "home";
    } else {
      alert("Invalid username or password");
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
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
      body: JSON.stringify({ username, password }),
    });

    res = await res.json();

    if (res.username) {
      localStorage.setItem("username", username);
      window.location.href = "home.html";
    } else {
      alert("That username is unavailable");
    }
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <div id="login">
        <p>
          <label htmlFor="username">Username: </label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <div className="button-container">
          <button id="submit-button" type="submit" onClick={handleLogin}>
            Submit
          </button>
          <button id="register-button" type="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
      <img
        id="slideshow"
        alt="Slideshow Placeholder"
        src="images/census_example.png"
        width="800px"
      />
    </main>
  );
}
export default Login;
