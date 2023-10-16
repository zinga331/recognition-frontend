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

> Strings are a primitive type in JavaScript. A string variable is specified by surrounding a sequence of characters with single quotes ('), double quotes ("), or backticks (`). The meaning of single or double quotes are equivalent, but the backtick defines a string literal that may contain JavaScript that is evaluated in place and concatenated into the string. A string literal replacement specifier is declared with a dollar sign followed by a curly brace pair. Anything inside the curly braces is evaluated as JavaScript. You can also use backticks to create multiline strings without having to explicitly escape the newline characters using the backslash (\).

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
