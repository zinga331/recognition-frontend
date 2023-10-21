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
