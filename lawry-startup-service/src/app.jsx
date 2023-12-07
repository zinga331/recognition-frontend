import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Index } from './index/index';

export default function App() {
  return <BrowserRouter>
        <div className='body'>
            <header>
                <h1>Full Page Indexing</h1>

                <span id="userDisplay">Hello, Anon!</span>
                <span id="loginLink">Login / Logout</span>
                <button className="toggle-popup">Notifications</button>
                <div className="notification" tabindex="0">No notifications yet</div>
            </header>

            <main>
                <Routes>
                    <Route 
                        path='/'
                        element={<Index/>}
                        exact/>
                    <Route 
                        path='/login'
                        element={<Login/>}
                        exact/>
                    <Route path='*' element={<NotFound />} />
                </Routes>      
            </main>

            <footer>
                <span class="authors">Lawry Sorenson and Christian Hall</span>
                <a href="https://github.com/zinga331/startup/tree/main">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>;
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
