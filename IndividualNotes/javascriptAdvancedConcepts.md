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
