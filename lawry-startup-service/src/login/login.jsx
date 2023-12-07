import React from 'react';
import '../app.css'; // TODO: local elements

export function Login() {
  return (
    <main>
      <h1 className="welcome">Welcome</h1>

      <div className="content">

        <div className="image-wrapper">
          <img src="./images/example.png" className="image"></img>
        </div>
        
        <div className="form-wrapper">
          <form action="javascript:void(0);">
            <input type="text" id="username" placeholder="Username" />
            <input type="password" id="password" placeholder="Password" />
            <div className="button-row">
              <button id="loginButton">Login</button>
              <button id="registerButton">Register</button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
