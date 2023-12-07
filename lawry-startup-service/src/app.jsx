import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='body'>
    <header>
      <h1>Full Page Indexing</h1>

      <span id="userDisplay">Hello, Anon!</span>
      <span id="loginLink">Login / Logout</span>
      <button className="toggle-popup">Notifications</button>
      <div className="notification" tabindex="0">No notifications yet</div>
    </header>

    <main>App will display here</main>

    <footer>
      <span class="authors">Lawry Sorenson and Christian Hall</span>
      <a href="https://github.com/zinga331/startup/tree/main">GitHub</a>
    </footer>

    </div>;
}