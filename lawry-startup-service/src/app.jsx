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

  let hideNoticeTimer = 0;
  async function notify(msg) {
    setNotice(msg);
    setDisplayNotice(true);
    if (hideNoticeTimer) clearTimeout(hideNoticeTimer),hideNoticeTimer=null;
    hideNoticeTimer = setTimeout(() => {setDisplayNotice(false);hideNoticeTimer=null}, 10000);
  }

  function setupWebsocket() {
    setTimeout(() => notify("You've been on the page for ten seconds"), 10000);
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        console.log("Connected web socket");
    };
    socket.onclose = (event) => {
        console.log("Disconnected web socket");
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data);
        const msgText = msg.msg;
        console.log('Received web socket socket message', msgText);
        notify(msgText);
    };
}

  React.useEffect(() => {
    async function init() {
        // setUsername('pipoika');
        setupWebsocket();

        // get initial username
        let username = await fetch("/api/whoami");
        username = await username.json();
        username = username.username;
        if (username) setUsername(username);
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
