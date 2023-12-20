1. What ports are used for HTTP, HTTPS, SSH?
HTTP: 80
HTTPS: 443
SSH: 22
1. What do HTTP status codes in the 300, 400, 500 range indicate?
300: Redirection
400: Client Error
500: Server Error
1. What does the HTTP header content-type allows you to do?
It allows you to specify the type of data being sent, such as JSON, HTML, XML, etc.
1. What do the following attributes of a cookie do?
- Domain
Domain specifies which hosts are allowed to receive the cookie. If unspecified, it defaults to the host of the current document location, excluding subdomains. If Domain is specified, then subdomains are always included.
- Path
This attribute specifies the URL path that must exis in the request URL in order to send the Cookie header. The %x2F ("/") charater is considered a directory separator, and subdirectories will match as well.
- SameSite
Lets servers specify whether/when cookies are sent when cross-site requests are made (where Site is defined by the registrable domain). It provides some protection against cross-site request forgery attacks (CSRF) by preventing the browser from sending the cookie along with cross-site requests. Possible values for the flag are `Lax`, `Strict`, and `None`.
  1. Lax: Cookies are allowed to be sent with top-level navigations and will be sent along with GET request initiated by third party website if the user is navigating to the URL from the third party website. This is the default value in modern browsers.
  1. Strict: Cookies will only be sent in a first-party context and not be sent along with requests initiated by third party websites.
  1. None: Cookies will be sent in all contexts, i.e sending cross-origin is allowed.
- HTTPOnly
When true, the cookie is inaccessible to JavaScript's Document.cookie API; it is sent only to the server. For example, cookies that persist server-side sessions don't need to be available to JavaScript, and should have this flag set.
1. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
```javascript
app.use('/foo', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
app.get('/foo/bar', function (req, res, next) {
  res.send('Hello World!')
  console.log('Request Type for /foo/bar:', req.method)
})
```
The output would be:
```javascript
Request Type: GET
Request Type for /foo/bar: GET
```


1. Given the following Express service code: What does the following JavaScript fetch return?
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
```javascript
fetch('http://localhost:3000/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```
> This fetch call sends a GET request to http://localhost:3000/api/data. The server responds with a JSON object, which is then logged to the console. So, the fetch call would return a Promise that resolves to the object { message: 'Hello, World!' }, and this object would be logged to the console.

1. Given the following MongoDB query
```
{ cost: { $gt: 10 }, name: /fran.*/}
```
select all of the matching documents.
```
[
  { _id: 1, name: 'frankfurter', cost: 15 },
  { _id: 2, name: 'francium', cost: 5 },
  { _id: 3, name: 'fran', cost: 20 },
  { _id: 4, name: 'fran', cost: 5 },
  { _id: 5, name: 'fran', cost: 15 },
  { _id: 6, name: 'frank', cost: 10 },
  { _id: 7, name: 'frank', cost: 20 },
  { _id: 8, name: 'frankenstein', cost: 25 },
  { _id: 9, name: 'frankenstein', cost: 5 },
  { _id: 10, name: 'frankincense', cost: 30 },
  { _id: 11, name: 'frankincense', cost: 5 },
  { _id: 12, name: 'franklin', cost: 35 },
  { _id: 13, name: 'franklin', cost: 5 },
  { _id: 14, name: 'franklin', cost: 15 },
  { _id: 15, name: 'franklin', cost: 25 },
  { _id: 16, name: 'franklin', cost: 35 },
  { _id: 17, name: 'franklin', cost: 5 },
  { _id: 18, name: 'franklin', cost: 15 },
  { _id: 19, name: 'franklin', cost: 25 },
  { _id: 20, name: 'franklin', cost: 35 },
]
```

1. How should you store user passwords in a database?
You should store the hash of the password, not the password itself. You can do this by using a hashing algorithm such as bcrypt.

1. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?

**Node.js service code**

```javascript
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
  });

  ws.send('Hello from server!');
});
```

**client-side code**
```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', function (event) {
  console.log('Message from server: ', event.data);
});
```

1. What is the WebSocket protocol used for?
1. What is JSX and how are the curly braces rendered?
1. Assuming a HTML document with a 
```<div id="root"></div>``` element, what content will the following React component generate?
```javascript  
function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      function App() {
        return (
          <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
          </div>
        );
      }
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
```
1. Assuming a HTML document with a 
```<div id="root"></div>``` element, what content will the following React component generate?
```javascript
    function Numbers() { 
      const numbers = [1, 2, 3, 4, 5];
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return(<ul>{listItems}</ul>)
    }
    const root = ReactDOM.createRoot(document.getElementById('root')); 
    root.render(<Numbers/>);
```
    1. What does the following React component do?
```javascript
    function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

1. What are React Hooks used for?
1. What is the useEffect hook used for?
1. What does this code do?
```javascript
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
1. What role does npm play in web development?
1. What does package.json do in a npm project?
1. What does the fetch function do?
1. What does node.js do?
1. What does Vite do?