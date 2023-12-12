import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Index } from './index/index';
import { Navigate } from 'react-router-dom';

export default function App() {
  const [username, setUsername] = React.useState('');
  const [ notice, setNotice ] = React.useState('');
  const [ displayNotice, setDisplayNotice ] = React.useState(false);

  async function notify(msg) {
    setNotice(msg);
    setDisplayNotice(true);
    setTimeout(() => {setDisplayNotice(false);console.log('X')}, 10000);
  }

  React.useEffect(() => {
    async function init() {
        setUsername('pipoika'); // REMOVE THIS
        notify('testiing 123');

        // get initial username
        // let username = await fetch("/api/whoami");
        // username = await username.json();
        // username = username.username;
        // if (username) setUsername(username);
    }
    init();
  }, []);

  async function logout() {
    setUsername('');
    await fetch("/api/logout", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
  }

  return (
    <BrowserRouter>
        <div className='body'>
            <header>
                <h1>Full Page Indexing</h1>

                {
                    {username} ?
                    <><span id="userDisplay">Hello, {username}!</span>
                    <NavLink id="loginLink" to='login' onClick={logout}>Logout</NavLink>
                    <button className="toggle-popup" onClick={() => setDisplayNotice(true)}>Notifications</button>
                    {displayNotice ? <div className="notification" tabIndex="0">{ notice }</div> : <></>}
                    </> : <></>
                }
                
            </header>

            <Routes>
                <Route 
                    path='/'
                    element={username ? <Index/> : <Navigate to="/login"/>}
                    exact/>
                <Route 
                    path='/login'
                    element={username ? <Navigate to="/"/> : <Login setGlobalUsername={setUsername}/>}
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
