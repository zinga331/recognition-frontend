import React from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css'; // TODO: local elements

export function Login({ setGlobalUsername }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuth, setAuth] = React.useState(false);

  async function _login_or_register_helper(path) {
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
        setGlobalUsername(res.username);
        setAuth(true);
    } else if (res.msg) {
        alert(res.msg);
    }
  }

  if (isAuth) return <Navigate to="/"></Navigate>

  return (
    <main>
      <h1 className="welcome">Welcome</h1>

      <div className="content">

        <div className="image-wrapper">
          <img src={"./images/example.png"} className="image"></img>
        </div>
        
        <div className="form-wrapper">
          <form action="javascript:void(0);">
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              />
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="button-row">
              <button
                id="loginButton"
                onClick={() => _login_or_register_helper("/api/login")}
                >
                Login
              </button>

              <button
                id="registerButton"
                onClick={() => _login_or_register_helper("/api/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
