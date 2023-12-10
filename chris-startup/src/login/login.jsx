import React from "react";

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <body>
        <div id="login">
          <p>
            <label for="username">Username: </label>
            <input type="username" id="username" name="varUsername" />
          </p>
          <p>
            <label for="password">Password: </label>
            <input type="password" id="password" name="varPassword" />
          </p>
          <div className="button-container">
            <button id="submit-button" type="submit">
              Submit
            </button>
            <button id="register-button" type="register">
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
        <script src="login.js"></script>
      </body>
    </main>
  );
}
export default Login;
