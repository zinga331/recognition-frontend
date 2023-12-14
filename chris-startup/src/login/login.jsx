import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
      navigate("/home");
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
      navigate("/home");
    } else {
      alert("That username is unavailable");
    }
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <header>
        <NavLink className="nav-link" to="home">
          {" "}
          Visit indexing home page (log in)
        </NavLink>
      </header>
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
          <Button id="submit-button" type="button" onClick={handleLogin}>
            Submit
          </Button>
          <Button id="register-button" type="button" onClick={handleRegister}>
            Register
          </Button>
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
