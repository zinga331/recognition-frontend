# Javascript notes

## Javascript essentials

While semicolons are not required in some cases, it is usually considered good form to end JavaScript statementss with a semicolon. Code blocks and their related scope are defined with curly braces.

### Console Log

> You can create formatted messages in the log parameter.

```js
console.log("hello %s", "world");
// OUTPUT: hello world
```

> You can even specify CSS declarations in order to style the log output.

```js
console.log("%c JavaScript Demo", "font-size:1.5em; color:green;");
// OUTPUT: JavaScript Demo //in large green text
```

### Timers

If you are trying to see how long a piece of code is running you can wrap it with `time` and `timeEnd` calls and it will output the duration between the `time` and `timeEnd` calls.

```js
console.time("demo time");
// ... some code that takes a long time.
console.timeEnd("demo time");
// OUTPUT: demo time: 9762.74 ms
```

### Count

You can see how many times a block of code is called by using the `count` function.

```js
console.count("Calculating relatives");
// OUTPUT: Calculating relatives: 1
console.count("Calculating relatives");
// OUTPUT: Calculating relatives: 2
console.count("Printing relatives");
// OUTPUT: Printing relatives: 1
```

## Connecting JavaScript to HTML

You can insert Javascript directly into HTML by including it within a <script> element, or by using the srcc attribut of a script element to reference an external script file.

**index.js**

```js
function sayHello() {
  console.log("Hello");
}
```

**index.html**

```html
<head>
<script src="index.js></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

**Also works:**

```html
<button onclick="let i=1;i++;console.log(i)">press me</button>
<!-- OUTPUT: 2 -->
```

## JavaScript type and construct

### Variables

Declare variables primarily with let and const, with let representing a changable variable and const representing a static variable.

```js
let changable = 1;

const unchanged = 2;
```

> ⚠ Originally JavaScript used the keyword `var` to define variables. This has been deprecated because they cause hard-to-detect errors in code related to the scope of the variable. You should avoid `var` and always declare your variables either with `let` or `const`.

### Primitive Types

> JavaScript defines several primitive types.

| Type        | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| `Null`      | The type of a variable that has not been assigned a value. |
| `Undefined` | The type of a variable that has not been defined.          |
| `Boolean`   | true or false.                                             |
| `Number`    | A 64-bit signed number.                                    |
| `BigInt`    | A number of arbitrary magnitude.                           |
| `String`    | A textual sequence of characters.                          |
| `Symbol`    | A unique value.                                            |

> Of these types Boolean, Number, and String are the types commonly thought of when creating variables. However, variables may commonly refer to the Null or Undefined primitive. Because JavaScript does not enforce the declaration of a variable before you use it, it is entirely possible for a variable to have the type of Undefined.

> In addition to the above primitives, JavaScript defines several object types. Some of the more commonly used objects include the following:

| Type       | Use                                                                                    | Example                  |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------ |
| `Object`   | A collection of properties represented by name-value pairs. Values can be of any type. | `{a:3, b:'fish'}`        |
| `Function` | An object that has the ability to be called.                                           | `function a() {}`        |
| `Date`     | Calendar dates and times.                                                              | `new Date('1995-12-17')` |
| `Array`    | An ordered sequence of any type.                                                       | `[3, 'fish']`            |
| `Map`      | A collection of key-value pairs that support efficient lookups.                        | `new Map()`              |
| `JSON`     | A lightweight data-interchange format used to share information across programs.       | `{"a":3, "b":"fish"}`    |

### Operators

Common operators include:

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `===` Equality
- `!==` Inequality

But in the case of string variables, Javascript supports:

- `+` Concatenation
- `===` Equality

### Type Conversions

> JavaScript is a weakly typed language, and that means while each variable has a type, the variable can change type when assigned a new value, or automatically convert based upon the context they are use. This can be unexpected and lead to bugs in your code.

```js
2 + "3";
// OUTPUT: '23'
2 * "3";
// OUTPUT: 6
[2] + [3];
// OUTPUT: '23'
true + null;
// OUTPUT: 1
true + undefined;
// OUTPUT: NaN
```

> Getting unexpected results is especially common when dealing with the [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) operator.

```js
1 == "1";
// OUTPUT: true
null == undefined;
// OUTPUT: true
"" == false;
// OUTPUT: true
```

> ⚠ The unexpected results happen in JavaScript because it uses [complex rules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#strict_equality_using) for defining equality that depend upon the conversion of a type to a boolean value. You will sometimes hear this referred to as [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) evaluations. **To remove this confusion, JavaScript introduced the strict equality (===) and inequality (!==) operators. The strict operators skip the type conversion when computing equality. This results in the following.**

```js
1 === "1";
// OUTPUT: false
null === undefined;
// OUTPUT: false
"" === false;
// OUTPUT: false
```

### Conditionals

JS supports common conditionals that I already know. Instead, I need to get familiar with ternary operators, which provide a compact way of producing an if-else statement

```js
a === 1 ? console.log(1) : console.log("not 1");
```

Boolean operations in the expression can be used to create complex predicates. I'm aware of `&&` and `||` and `!`.

### Loops

This language supports do, do while, and for loops.

`for in` statements iterate over an objects' property names.

```js
const obj = { a: 1, b: "fish" };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b
```

`for of` statements iterate over an objects' property values.

```js
const arr = ["a", "b"];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

Remember that property names are iterated with `for in` and property values are iterated with `for of`.

Javascript still supports break and continue statements to abort or advance the loop.

## String tips

> Strings are a **primitive type** in JavaScript. A string variable is specified by surrounding a sequence of characters with single quotes ('), double quotes ("), or backticks (`). The meaning of single or double quotes are equivalent, but the backtick defines a string literal that may contain JavaScript that is evaluated in place and concatenated into the string. A string literal replacement specifier is declared with a dollar sign followed by a curly brace pair. Anything inside the curly braces is evaluated as JavaScript. You can also use backticks to create multiline strings without having to explicitly escape the newline characters using the backslash (\).

```js
"quoted text"; // " also works

const l = "literal";
console.log(`string ${l + (1 + 1)} text`);
// OUTPUT: string literal2 text
```

### String functions

Here are some of the most common string functions:

> The string object has several interesting functions associated with it. Here are some of the commonly used ones.

| Function      | Meaning                                                      |
| ------------- | ------------------------------------------------------------ |
| length        | The number of characters in the string                       |
| indexOf()     | The starting index of a given substring                      |
| split()       | Split the string into an array on the given delimiter string |
| startsWith()  | True if the string has a given prefix                        |
| endsWith()    | True if the string has a given suffix                        |
| toLowerCase() | Converts all characters to lowercase                         |

```js
const s = "Example:조선글";

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf("조선글"));
// OUTPUT: 8
console.log(s.split(":"));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith("Ex"));
// OUTPUT: true
console.log(s.endsWith("조선글"));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

## Functions

> The basic syntax of a function begins with the function keyword followed by zero or more parameters and a body that may contain zero or more return statements. The return statement may return a single value. Note that there are no type declarations, as the type is always inferred by the assignment of the value to the parameter.

```js
function hello(who) {
  return "hello " + who;
}

console.log(hello("world"));
// OUTPUT: hello world
```

Functions without a return value may be intended to modify a passed parameter or interact with an external program. In this case, the function returns undefined.

When a function is called, the caller may choose to pass zero or more parameters. If the caller passes fewer parameters than the function expects, the missing parameters are assigned the value of undefined. If the caller passes more parameters than the function expects, the extra parameters are ignored.

```js
function labeler(value, title = "title") {
  console.log(`${title}=${value}`);
}

labeler();
// OUTPUT: title=undefined

labeler("fish");
// OUTPUT: title=fish

labeler("fish", "animal");
// OUTPUT: animal=fish
```

### [Creating passing, and returning functions](https://github.com/webprogramming260/.github/blob/main/profile/javascript/functions/functions.md#creating-passing-and-returning-functions)

The above are a few examples of "assigning functions to variables, as well as using functions as parameters and return values." Get familiar with them.

### Arrow functions

> Because functions are first order objects in JavaScript they can be declared anywhere and passed as parameters. This results in code with lots of anonymous functions cluttering things up. To make the code more compact the `arrow` syntax was created. This syntax replaces the need for the `function` keyword with the symbols `=>` placed after the parameter declaration. The enclosing curly braces are also optional.

> This is a function in arrow syntax that takes no parameters and always returns 3.

```js
() => 3;
```

> The following two invocations of sort are equivalent.

```js
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

> Besides being compact, the `arrow` function syntax has some important semantic differences from the standard function syntax. This includes restrictions that arrow functions cannot be used for constructors or iterator generators.

" The sort function of javascript accepts the data to be sorted, and then a function that compares two values and returns a negative number if the first value is less than the second, a positive number if the first value is greater than the second, and zero if the two values are equal. The arrow function syntax is used to create a function that takes two parameters and returns the difference between them. This is a common pattern in JavaScript. "

### Return values

Arrow functions have special rules for the return keyword. If no curly braces are provided, the return value is the value of the expression. If curly braces are provided, the return value must be explicitly specified.

```js
() => 3;
// RETURNS: 3

() => {
  3;
};
// RETURNS: undefined

() => {
  return 3;
};
// RETURNS: 3
```

### `this` keyword

> [!NOTE]
> This section's notes were generated via github copilot.

In JavaScript, `this` is a special keyword that refers to the object that the function is a method of. The value of `this` depends on how the function is called.

Here are some common ways that `this` can be used:

1. In a method of an object, `this` refers to the object itself. For example:

```js
const person = {
  name: "John",
  sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
  },
};

person.sayHello(); // logs "Hello, my name is John."
```

2. In a function that is not a method of an object, `this` refers to the global object (`window` in a browser, or `global` in Node.js). For example:

```js
function sayHello() {
  console.log(`Hello, my name is ${this.name}.`);
}

sayHello(); // logs "Hello, my name is ."
```

3. In a function that is called with the `new` keyword, `this` refers to the newly created object. For example:

```js
function Person(name) {
  this.name = name;
}

const john = new Person("John");
console.log(john.name); // logs "John"
```

4. In a function that is called with `call`, or `apply` method, `this` refers to the object that is passed as the first argument. For example:

```js
const person1 = {
  name: "John",
};

const person2 = {
  name: "Jane",
};

function sayHello() {
  console.log(`Hello, my name is ${this.name}.`);
}

sayHello.call(person1); // logs "Hello, my name is John."
sayHello.apply(person2); // logs "Hello, my name is Jane."
```

### Putting it all togther (by Lee Jensen)

> Now that you know how functions work in JavaScript, let's look at an example that demonstrates the use of functions, arrow functions, parameters, a function as a parameter (callback), closures, and browser event listeners. This is done by implementing a `debounce` function.

> The point of a debounce function is to only execute a specified function once within a given time window. Any requests to execute the debounce function more frequently than this will case the time window to reset. This is important in cases where a user can trigger expensive events thousands of times per second. Without a debounce the performance of your application can greatly suffer.

> The following code calls the browser's `window.addEventListener` function to add a callback function that is invoked whenever the user scrolls the browser's web page. The first parameter to `addEventListener` specifies that it wants to listen for `scroll` events. The second parameter provides the function to call when a scroll event happens. In this case we call a function named `debounce`.

> The debounce function takes two parameters, the time window for executing the window function, and the window function to call within that limit. In this case we will execute the arrow function at most every 500 milliseconds.

```js
window.addEventListener(
  "scroll",
  debounce(500, () => {
    console.log("Executed an expensive calculation");
  })
);
```

> The debounce function implements the execution of windowFunc within the restricted time window by creating a closure that contains the current timeout and returning a function that will reset the timeout every time it is called. The returned function is what the scroll event will actually call when the user scrolls the page. However, instead of directly executing the `windowFunc` it sets a timer based on the value of `windowMs`. If the debounce function is called again before the window times out then it resets the timeout.

```js
function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log("scroll event");
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```

> You can experiment with this in [CodePen](https://codepen.io/zinga331/pen/oNJrzaM). In this example, the background color will change as long as the user is scrolling. When they stop the background reverts back to white.

## JavaScript array

📖 **Deeper dive reading**: [MDN Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

> JavaScript array objects represent a sequence of other objects and primitives. You can reference the members of the array using a zero based index. You can create an array with the Array constructor or using the array literal notation shown below.

```js
const a = [1, 2, 3];
console.log(a[1]);
// OUTPUT: 2

console.log(a.length);
// OUTPUT: 3
```

### Object functions

The Array object has several interesting static functions associated with it. Here are some of the interesting ones.

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => 1 < 1)`          |

```js
const a = [1, 2, 3];

console.log(a.map((i) => i + i));
// OUTPUT: [2,4,6]
console.log(a.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(a.sort((v1, v2) => v2 - v1));
// OUTPUT: [3,2,1]

a.push(4);
console.log(a.length);
// OUTPUT: 4
```

### Assignment

Our task was to implement result in both testAll and outside so that result would return if every element in the array was larger than size of three.

```js
function testAll(input, tester) {
  // check every element in the array using anonymous function tester, then return the result.
  const result = input.every(tester);
  return result;
}

const result = testAll(
  ["re", "weee", "stand", "along", "this", "road"],
  (value) => value.length > 3
);

console.log(result);
```
