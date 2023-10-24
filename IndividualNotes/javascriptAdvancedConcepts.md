# Javascript regular expressions

## Basic uses of regular expressions

You ocan think of regular expression as textual pattern matchers. They are used to find patterns in strings, so you can simply replace the text, or know if it matches a pattern.

We can create a regular expression in two ways, the first is through the RegExp constructor, and the second is through the literal syntax:

```js
const objRegex = new RegExp("ab*", "i");
const literalRegex = /ab*/i;
```

Here are some use cases of regular expressions. First we return the matching patterns of the text, second we replace the maching paterns, and third, we test if the text matches the pattern.

```js
const petRegex = /(dog)|(cat)|(bird)/gim;
const text = "Both cats and dogs are pets, but not rocks.";

text.match(petRegex);
// RETURNS: ['cat', 'dog']

text.replace(petRegex, "animal");
// RETURNS: Both animals and animals are pets, but not rocks.

petRegex.test(text);
// RETURNS: true
```

## Rest and spread

Rest parameters are prefixed by three periods and must be the last variable in the function definition. They are used to collect all remaining arguments into an array. You can remember what "rest" does because it collects the "rest" of the arguments into an array.

```js
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

Spread, on the other hand, does the opposite. it takess an iterable object (like an array or a string) and expans it into a function's parameters. Like so:

```js
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...["Ryan", "Dahl"]);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

# Exceptions

JavaScript supports exeption handling like Java and other languages. You can throw an exception with the `throw` keyword, and catch it with the `try` and `catch` keywords.

```js
function connectDatabase() {
  throw new Error("connection error");
}

try {
  connectDatabase();
  console.log("never executed");
} catch (err) {
  console.log(err);
} finally {
  console.log("always executed");
}

// OUTPUT: Error: connection error
//         always executed
```

> [!NOTE]
> ⚠ When first using exception handling it is tempting to use it as way to handle normal flows of execution. For example, throwing a file not found exception when it is common for users to request nonexistent files. Throwing exceptions should only happen when something truly exceptional occurs. For example, a file not found exception when the file is required for your code to run, such as a required configuration file. Your code will be easier to debug, and your logs more meaningful if you restrict exceptions to truly exceptional situations.

## Fallbacks

> The fallback pattern is commonly implemented using exception handling. To implement the fallback pattern you put the normal feature path in a try block and then provide a fallback implementation in the catch block. For example, normally you would get the high scores for a game by making a network request, but if the network is not available then a locally cached version of the last available scores is used. By providing a fallback, you can always return something, even if the desired feature is temporarily unavailable.

```js
function getScores() {
  try {
    const scores = scoringService.getScores();
    // store the scores so that we can use them later if the network is not available
    window.localStorage.setItem("scores", scores);
    return scores;
  } catch {
    return window.localStorage.getItem("scores");
  }
}
```

# Destructoring

Destructuring is a way to extract data from arrays and objects into distinct variables, or removing structure.

```js
const a = [1, 2, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
// OUTPUT: 1, 2
```

Even though it looks like we are declaring an array with the syntax on the left side of the expression, we are instead specifying we and to destructure the first two variables out of the array.

Then you can combine multiple items from the original using rest syntax:

```js
const [b, c, ...others] = a;

console.log(b, c, others);
// OUTPUT: 1, 2, [4,5]
```

## Destructoring Notes Exerpt from Dr Jensen

You can also map the names to new variables instead of just using the original property names.

```js
const o = { a: 1, b: "animals", c: ["fish", "cats"] };

const { a: count, b: type } = o;

console.log(count, type);
// OUTPUT 1, animals
```

Default values may also be provided for missing ones.

```js
const { a, b = 22 } = {};
const [c = 44] = [];

console.log(a, b, c);
// OUTPUT: undefined, 22, 44
```

Note that all of the above examples created new constant variables, but you can also use destructuring to reassign existing variables.

```js
let a = 22;

[a] = [1, 2, 3];

console.log(a);
// OUTPUT: 1
```

# Objects and Constructors

## Object Literals

You can declare a variable of object type with the _object literal_ syntax. This syntax allows you to proved the initial composition of the object.

```js
const obj = {
  a: 3,
  b: fish,
};
```

### Object functions exerpt from Dr Jensen

> Object has several interesting static functions associated with it. Here are some of the commonly used ones.

| Function | Meaning                             |
| -------- | ----------------------------------- |
| entries  | Returns an array of key value pairs |
| keys     | Returns an array of keys            |
| values   | Returns an array of values          |

```js
const obj = {
  a: 3,
  b: "fish",
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```

## Constructor

Any function that returns an object is considered a `constructor` and can be invoked with the `new` keyword.

```js
function Person(name) {
  return;
  {
    name: name;
  }
}
const p = new Person("Lawry Uvas");
console.log(p);
// OUTPUT: {name: 'Lawry Uvas'}
```

Objects can have any type of property, including functions. In this context, they are called `methods`. They are a part of its encapsulation.

```js
function Person(name) {
  return {
    name: name,
    greet: function () {
      console.log("Hello, my name is " + this.name + ".");
    },
  };
}

const p = new Person("Lawry Uvas");
p.log();
// OUTPUT: Hello, my name is Lawry Uvas.
```

[!NOTE] ⚠ The `this` keyword is a reference to the current object. Notice in the last example the use of the keyword `this` when we referred to the name property (`this.name`). The meaning of `this` depends upon the scope of where it is used, but in the context of an object it refers to a pointer to the object.

> "We will talk more about the this pointer in the instruction on scope."

## Classes

We can start using classes to define objects. Using a class clarifies the intent to creat a reausable component rather than a one-off object. Class declarations look similar to declaring an object, but classes have an explicit constructor and assumed function declarations. The person object from above would look like the following when converted to a class.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log("Hello, my name is " + this.name + ".");
  }
}
const p = new Person("Lawry Uvas");
p.log();
// OUTPUT: Hello, my name is Lawry Uvas.
```

We set properties and functions to `private` by prefixing them with a `#`.

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
const p new Person("Lawry Uvas");
p.#name = 'lie';
// OUTPUT: SyntaxError: Private field '#name' must be declared in an enclosing class
```

## Inheritance

Classes can be exended using the `extends` keyword to define inheritance. Parameters that need to be passed to the parent class are delivered using the `super` function. Any functions defined on teh child that have the same name as the parent override the parent's implementation. However, a parent's function can be explicitly accessed using the `super` keyword.

```java
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    console.log("Hello, my name is " + this.name + );
  }
}
class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + " and I am a " + this.position + ".";
  }
}
const e = new Employee("Lawry Uvas", "research assistant");
console.log(e.print());
// OUTPUT: Hello, my name is Lawry Uvas and I am a research assistant.
```

## ☑ Assignment

Create a CodePen that starts with the following code

```js
class Phone {
  constructor(regEx) {
    // Implement the constructor
  }

  // Implement the Connected constant getter

  connect(...numberParts) {
    // Return an object if the number matches the regEx
    // Otherwise thrown an exception
  }
}

const phone = new Phone(/\d{3}-\d{3}-\d{4}/);

const calls = [
  { name: "Li", number: ["333", "333", "3333"] },
  { name: "Juan", number: ["222", "222", "2222"] },
  { name: "Meg", number: ["8E26F", "811F"] },
];

for (const call of calls) {
  try {
    const { result } = phone.connect(...call.number);
    if (result === Phone.Connected) {
      console.log(`called ${call.name}`);
    }
  } catch (ex) {
    console.log(`${ex.message} for ${call.name}`);
  } finally {
    console.log("done");
  }
}
```

and implements the following functionality of the Phone class:

1. Has a constructor that accepts a regular expression as a parameter. The regular expression is stored on the object for future reference.
1. Has a `Connected` getter that defines a constant for the class that is set to a value of 'connected'.
1. Has a `connect` method that takes a variable number of values. The method joins the values together into a string that is separated by a '-' character and attempts to match it with the regular expression given in the constructor. If it fails it throws an exception. Otherwise it passes back an object that has an `id` and `result` property, where the result is set to Phone.Connected.

Once you have implemented the Phone class. Examine the CodePen console output. It should look like this:

```sh
called Li
done
called Juan
done
invalid number for Meg
done
```

When you get this result, submit your CodePen URL to the Canvas assignment.

Don't forget to update your GitHub startup repository notes.md with all of the things you learned and want to remember.

### 🧧 Possible solution

If you get stuck here is a [possible solution](https://codepen.io/leesjensen/pen/yLRgPNa).

# Scope

Java has four different types of scope:

1. Global - Visible to all code
1. Module - Visible to all code running in a module
1. Function - Visible within a funciton
1. Block - Visible within a block of code delimited by curly braces

## Var

Var was initually used to declar a variable. The problem with it was that unlike `const` or `let`, is that it ignores block scope. For example, the following code shows the same varaible name being used within different enclosing scopes. However, because var ignores block sope, the for loop is simply assigning a new value to `x` rather than declaring a new variable named `x`.

```js
var x = 10;
console.log("start", x);

for (var x = 0; x < 1; x++) {
  console.log("middle", x);
}

console.log("end", x);

// OUTPUT: start 10
//         middle 0
//         end 1
```

It's strongly suggested we only use `const` and `let` to declare variables unless we understand why we are using `var`.

## This

The keyword `this` represents a variable that points to an object that contains the context within the scope of the current executing line of code. The value of `this` changes depending upon the context of the code. There are three different contexts in which `this` is referenced. They refer to:

1. Global - When `this` is referenced outside a function or object, it refers to the `globalThis` object.
   > The globalThis object represents the context for runtime environment. For example, when running in a browser, globalThis refers to the browser's window object.
1. Function - When `this` is referenced in a function, it refers to the object that owns the function. That is either an object you defined or globalThis if the function is defined outside of an object.
   > Note that when running is JavaScript strict mode, a global function's this variable is undefined instead of globalThis.
1. Object - When `this`is referenced in an object it referes to the object.

```js
"use strict";

// global scope
console.log("global:", this);
console.log("globalThis:", globalThis);

// function scope for a global function
function globalFunc() {
  console.log("globalFunctionThis:", this);
}
globalFunc();

// object scope
class ScopeTest {
  constructor() {
    console.log("objectThis:", this);
  }

  // function scope for an object function
  objectFunc() {
    console.log("objectFunctionThis:", this);
  }
}

new ScopeTest().objectFunc();
```

> Running the above code in a browser results in the following.

```
global: Window
globalThis: Window
globalFunctionThis: undefined
objectThis: ScopeTest
objectFunctionThis: ScopeTest
```

> Note that if we were not using JavaScript strict mode then globalFunctionThis would refer to Window.

## Closure

> A closure is defined as a function and its surrounding state. That means whatever variables are accessible when a function is created are available inside of that function. This holds true even if you pass the function outside of its original creation.

> Here is an example of a function that is created as part of an object. That means that function has access to the object's this pointer.

```js
globalThis.x = "global";

const obj = {
  x: "object",
  f: function () {
    console.log(this.x);
  },
};

obj.f();
// OUTPUT: object
```

> Arrow functions are a bit different because they inherit the this pointer of their creation context. So if we change our previous example to return an arrow function, then this pointer at the time of creation will be globalThis.

```js
globalThis.x = "global";

const obj = {
  x: "object",
  f: () => console.log(this.x),
};

obj.f();
// OUTPUT: global
```

> However, if we make function in our object that **returns** an arrow function, then the this pointer will be the object's this pointer since that was the active context at the time the arrow function was created.

```js
globalThis.x = "global";

const obj = {
  x: "object",
  make: function () {
    return () => console.log(this.x);
  },
};

const f = obj.make();
f();
// OUTPUT: object
```

# JavaScript modules

# JavaScript DOM

[JavaScript Dom Diagram](/IndividualNotes/javascriptDom.png)

## Accessing the DOM

Every element in an HTML document implements the DOM Element interface, which is derived from the DOM Node interface. The DOM Node interface provides the means for iterating child elements, accessing the parent element, and manipulating the element's attributess.

> From your JavaScript code, you can start with the document variable and walk through the every element in the tree.

```js
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}

displayElement(document);
```

> You can provide a CSS selector to the `querySelectorAll` function in order to select elements from the document. The `textContent` property contains all of the element's text. You can even access a textual representation of an element's HTML content with the `innerHTML` property.

```js
const listElements = document.querySelectorAll("p");
for (const el of listElements) {
  console.log(el.textContent);
}
```

The above code will print the text content of every paragraph element in the document.

## Manipulating/Modifying the DOM

The DOM supports the ability to insert, modify, or delete elements in the DOM. To create a new element in the tree, you first need to create the element on the DOM document. You can then insert the element into the tree by appending it to an exesting element in the tree. The following example demonstrates appendChild doing so on a parent element.

```js
function insertChild(parentSelector, text) {
  const newChild = document.createElement("div");
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild("#courses", "new course");
```

> To delete elements call the `removeChild` function on the parent element.

```js
function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement("#courses div");
```

## Injecting HTML

The DOM allows you to inject entire blocks of HTML into an element too. The next example finds the first `div` element in the DOM and replacess its content with the HTML provided.

```js
const el = document.querySelector("div");
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
```

However, injecting HTML as a block of text is a common vulnerableility for hackers. See this example:

```js
<img src="bogus.png" onerror="console.log('All your base are belong to us')" />
```

> If you are injecting HTML, make sure that it cannot be manipulated by a user. Common injection paths include HTML input controls, URL parameters, and HTTP headers. Either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of using `innerHTML`.

## Event Listeners

All DOM elements support the ability to attach a function that gets called when an event occcurs on the element. These function sare called event `listeners`. This is a click listener:

```js
const submitDataEl = document.querySelector("#submitData");
submitDataEl.addEventListener("click", function (event) {
  console.log(event.type);
});
```

There are lots of possible events that you can add a listener to. This includes things like mouse, keyboard, scrolling, animation, video, audio, WebSocket, and clipboard events. You can see the full list on [MDN](https://developer.mozilla.org/en-US/docs/Web/Events). Here are a few of the more commonly used events.

| Event Category | Description           |
| -------------- | --------------------- |
| Clipboard      | Cut, copied, pasted   |
| Focus          | An element gets focus |
| Keyboard       | Keys are pressed      |
| Mouse          | Click events          |
| Text selection | When text is selected |

You can also add event listeners directly in the HTML. For example, here is a `onclick` handler that is attached to a button.

```html
<button onclick='alert("clicked")'>click me</button>
```

## ☑ Assignment

This [CodePen](https://codepen.io/leesjensen/pen/RwJJZBb) dynamically manipulates the DOM using JavaScript. Create a fork of the pen and take some time to experiment with it.

I've forked the pen and it is found [here](https://codepen.io/zinga331/pen/JjxoqQr)

Then complete the following:

1. Add a new table that represents the seven peaks of Utah County.

   - name: "Timpanogos", height: 11750, quality: 4.8
   - name: "Santaquin", height: 10687, quality: 3.8
   - name: "Lone Peak", height: 11253, quality: 5
   - name: "Provo Peak", height: 11068, quality: 4.1
   - name: "Cascade", height: 10908, quality: 3.2
   - name: "Nebo", height: 11928, quality: 4.8
   - name: "Spanish Fork", height: 10192, quality: 3.4

1. Sort the table when a header is clicked on

When you are done submit your CodePen URL to the Canvas assignment.

Don't forget to update your GitHub startup repository notes.md with all of the things you learned and want to remember.

### 🧧 Possible solution

If you get stuck here is a [possible solution](https://codepen.io/leesjensen/pen/yLRgpej).

### My Solution

```js
"use strict";

const SevenSummits = [
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Aconcagua", height: 6961, place: "Argentina" },
  { name: "Denali", height: 6194, place: "United States" },
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Elbrus", height: 5642, place: "Russia" },
  { name: "Vinson", height: 4892, place: "Antarctica" },
  { name: "Puncak Jaya", height: 4884, place: "Indonesia" },
];

const JazzMusic = [
  { title: "Take Five", artist: "Dave Brubeck", stars: 4.8 },
  { title: "So What", artist: "Miles Davis", stars: 3.8 },
  { title: "Take The A Train", artist: "Duke Ellington", stars: 4.2 },
  { title: "Round Midnight", artist: "Thelonious Monk", stars: 3.1 },
  { title: "My Favorite Things", artist: "John Coltrane", stars: 3.0 },
];

const UtahSevenPeaks = [
  { name: "Timpanogos", height: 11750, quality: 4.8 },
  { name: "Santaquin", height: 10687, quality: 3.8 },
  { name: "Lone Peak", height: 11253, quality: 5 },
  { name: "Provo Peak", height: 11068, quality: 4.1 },
  { name: "Cascade", height: 10908, quality: 3.2 },
  { name: "Nebo", height: 11928, quality: 4.8 },
  { name: "Spanish Fork", height: 10192, quality: 3.4 },
];

let currentData = SevenSummits;
let sortWay = -1;

function table(data = SevenSummits) {
  if (!!data && data.length > 1) {
    currentData = data;
    const headers = parseHeader(data);
    const tableElement = generateTable(headers, data);

    const output = document.getElementById("output");

    removeAllChildNodes(output);
    output.appendChild(tableElement);
  } else {
    outputData("invalid input", data);
  }
}

function parseHeader(data) {
  let headers = [];
  for (const [key, value] of Object.entries(data[0])) {
    headers.push({ name: key, type: typeof value });
  }
  return headers;
}

function generateTable(headers, data) {
  const tableElement = document.createElement("table");
  tableElement.classList.add("a");

  addTableStyles(headers);

  generateHeader(headers, tableElement);
  generateRows(data, tableElement);

  return tableElement;
}

function generateHeader(headers, tableElement) {
  const rowElement = document.createElement("tr");
  tableElement.appendChild(rowElement);

  headers.forEach((header) => {
    const cellElement = document.createElement("th");
    rowElement.appendChild(cellElement);
    const textNode = document.createTextNode(header.name);
    // Support sorting by adding a click listener to output.
    cellElement.addEventListener("click", function (column) {
      sortWay *= -1;
      const sortBy = column.target.innerText;
      const sortedData = currentData.sort(
        (a, b) => sortWay * (a[sortBy] > b[sortBy] ? 1 : -1)
      );
      table(sortedData);
    });
    cellElement.appendChild(textNode);
  });
}

function generateRows(data, tableElement) {
  data.forEach((dataRow) => {
    const rowElement = document.createElement("tr");
    tableElement.appendChild(rowElement);
    for (const [, value] of Object.entries(dataRow)) {
      const cellElement = document.createElement("td");
      rowElement.appendChild(cellElement);
      const textNode = document.createTextNode(value);
      cellElement.appendChild(textNode);
    }
  });
}

function addTableStyles(headers) {
  insertRule("#output table {border-collapse: collapse;}");
  insertRule("#output th,td {border: solid white thin;padding:.25em;}");
  insertRule(".selected {background: white; color:black;}");
  headers.forEach((header, index) => {
    if (header.type === "number") {
      insertRule(`#output tr td:nth-child(${index + 1}) {text-align:right;}`);
    }
  });
}

function insertRule(rule) {
  var sheet = window.document.styleSheets[0];
  sheet.insertRule(rule, sheet.cssRules.length);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function outputData(title, data) {
  const output = document.getElementById("output");
  output.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(
    data,
    null,
    2
  )}</pre>`;
}
```
