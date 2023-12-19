1. What ports are used for HTTP, HTTPS, SSH?
1. What do HTTP status codes in the 300, 400, 500 range indicate?
1. What does the HTTP header content-type allows you to do?
1. What do the following attributes of a cookie do?
- Domain
- Path
- SameSite
- HTTPOnly
1. Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /foo/bar?
1. Given the following Express service code: What does the following JavaScript fetch return?
1. Given the following MongoDB query
```
{ cost: { $gt: 10 }, name: /fran.*/}
```
select all of the matching documents.

1. How should you store user passwords in a database?
1. Assuming the following Node.js service code is executing with websockets, what will be logged to the console of the web browser?
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