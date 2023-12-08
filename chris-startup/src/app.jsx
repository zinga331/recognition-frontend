import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() { 
  return (<html>
  <header>
      <a href="home.html">Visit indexing home page (log in)</a>
  </header>
<head>
  <meta charset="UTF-8" /> 
  <title>Landing Page</title>
  <link rel="stylesheet" href="style.css" type="text/css" />
  <h1>Full-page Indexing</h1>
</head>
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
    <div class="button-container">
      <button id="submit-button" type="submit">Submit</button>
      <button id="register-button" type="register">Register</button>
    </div>
  </div>
    <img id="slideshow" alt="Slideshow Placeholder" src="images/census_example.png" width="800px" />
    <script src="login.js"></script>
</body>
<footer>
  <p>Project by Lawry Sorenson and Christian Hall:</p>
  <a href="https://github.com/zinga331/startup/blob/main/README.md#websocket-deliverable">Startup Repo</a>
</footer>

</html>);
}