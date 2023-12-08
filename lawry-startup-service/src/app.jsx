import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Index } from './index/index';

export default function App() {
  const [username, setUsername] = React.useState('');

  return (
    <BrowserRouter>
        <div className='body'>
            <header>
                <h1>Full Page Indexing</h1>

                {
                    username ?
                    <><span id="userDisplay">Hello, {username}!</span>
                    <NavLink id="loginLink" to='login'>Logout</NavLink>
                    <button className="toggle-popup">Notifications</button>
                    <div className="notification" tabIndex="0">No notifications yet</div>
                    </> : <></>
                }
                
            </header>

            <Routes>
                <Route 
                    path='/'
                    element={<Index/>}
                    exact/>
                <Route 
                    path='/login'
                    element={<Login setGlobalUsername={setUsername}/>}
                    exact/>
                <Route path='*' element={<NotFound />} />
            </Routes>      

            <footer>
                <span className="authors">Lawry Sorenson and Christian Hall</span>
                <a href="https://github.com/zinga331/startup/tree/main">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>);
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
