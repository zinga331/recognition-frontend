import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import  Login  from "./login/login.jsx";
import  Home  from "./home/home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <html>
        <header>
          <NavLink className="nav-link" to="home">
            {" "}
            Visit indexing home page (log in)
          </NavLink>
        </header>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/scores" element={<Scores />} />
          <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>
          <p>Project by Lawry Sorenson and Christian Hall:</p>
          <a href="https://github.com/zinga331/startup/blob/main/README.md#websocket-deliverable">
            Startup Repo
          </a>
        </footer>
      </html>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
