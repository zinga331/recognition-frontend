# React introduction

React abstracts HTML into a JavaScript variant called [JSX](https://reactjs.org/docs/introducing-jsx.html). It is then converted into valit HTML and JavaScript using a preprocessor called [Babel](https://babeljs.io/). The following is a JSX file, and it mixess both HTLM and JavaScript into a single representation.

```jsx
const i = 3;
const list = (
  <ol class='big'>
    <li>Item {i}</li>
    <li>Item {3 + i}</li>
  </ol>
);
```

Babel will convert that into valid JavaScript:

```js
const i = 3;
const list = React.createElement(
  'ol',
  { class: 'big' },
  React.createElement('li', null, 'Item ', i),
  React.createElement('li', null, 'Item ', 3 + i)
);
```

> The `React.createElement` function will then generate DOM elements and monitor the data they represent for changes. When a change is discovered, React will trigger dependent changes.

# Components

> React components allow you to modularize the functionality of your application. This allows the underlying code to directly represent the components that a user interacts with. It also enables code reuse as common application components often show up repeatedly.

## Render function

One of the priary purposes of a component is to generate the user interface. This is done by defining a `render` function that returns a JSX representation of the component. Whatever is returned from the `render` function is inserted into the component HTML element.

> As a simple example, a JSX file containing a React component element named `Demo` would cause React to load the `Demo` component, call the `render` function, and insert the result into the place of the `Demo` element.

**JSX**

```jsx
<div>
  Component: <Demo />
</div>
```

Notice that `Demo` is not a valid HTML element. The transpiler will replace this tag with the resulting rendered HTML.

**React component**

```js
function Demo() {
  const who = 'world';
  return <b>Hello {who}</b>;
}
```

**Resulting HTML**

```html
<div>Component: <b>Hello world</b></div>
```

## Props

React componenets also allow you to pass information to them in the form of element properties. The componenet receives the properties in its constructor and then can display them when it renders.

**JSX**

```jsx
<div>Component: <Demo who="Walke" /><div>
```

**React component**

```jsx
function Demo(props) {
  return <b>Hello {props.who}</b>;
}
```

**Resulting HTML**

```html
<div>Component: <b>Hello Walke</b></div>
```

## State

In addition to properties, a component can have internal state. Component state is created by calling the `React.useState` hook function. The `useState` function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called `clicked` and toggles the click state in the `updateClicked` function that gets called when the paragraph text is clicked.

```jsx
const Clicker = () => {
  const [clicked, updateClicked] = React.useState(false);

  const onClicked = (e) => {
    updateClicked(!clicked);
  };

  return <p onClick={(e) => onClicked(e)}>clicked: {`${clicked}`}</p>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```

You should note that you can use JSX even without a function. A simple variable representing JSX will work anyplace you would otherwise provide a component.

```jsx
const hello = <div>Hello</div>;

ReactDOM.render(hello, document.getElementById('root'));
```

## Class style components

In addition to the preferred `function style` components demonstrated above, React also supports `class style` components. However, you should note that the React team is moving away from the class style representation, and for that reason you should probably not use it. With that said, you are likely to see class style components and so you should be aware of the syntax. Below is the equivalent class style component for the `Clicker` component that we created above.

The major difference is that properties are loaded on the constructor and state is set using a `setState` function on the component object.

```jsx
class Clicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }
  onClicked() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }
  render() {
    return <p onClick={(e) => this.onClicked(e)}>clicked: {`${this.state.clicked}`}</p>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker />);
```
## Reactivity

A component's properties and state are used by the React framework to determine the reactivity of the interface. Reactivity controls how a component reacts to actions taken by the user or events that happen within the application. Whenever a component's state or properties change, the `render` function for the component and all of its dependent component `render` functions are called.


## ☑ Assignment

Create a fork of this [CodePen](https://codepen.io/leesjensen/pen/Yzvaver) and experiment.

[My Fork](https://codepen.io/zinga331/pen/MWLZwzV)

Try the following:

1. Add a new property to the Demo component that provides the background color for the component.
2. Add another state variable that changes the color on a mouse over event.

When you are done submit your CodePen URL to the Canvas assignment.

# Toolchains (notes by Prof. Jensen)


As web programming becomes more and more complex it became necessary to abstract away some of that complexity with a series of tools. Some common functional pieces in a web application tool chain include:

- **Code repository** - Stores code in a shared, versioned, location.
- **Linter** - Removes, or warns, of non-idiomatic code usage.
- **Prettier** - Formats code according to a shared standard.
- **Transpiler** - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
- **Polyfill** - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
- **Bundler** - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
- **Minifier** - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
- **Testing** - Automated tests at multiple levels to ensure correctness.
- **Deployment** - Automated packaging and delivery of code from the development environment to the production environment.

The toolchain that we use for our React project consists of [GitHub](https://github.com/) as the code repository, [Vite](https://vitejs.dev/) for JSX, TS, development and debugging support, [ESBuild](https://esbuild.github.io/) for converting to ES6 modules and transpiling (with [Babel](https://babeljs.io/docs/en/) underneath), [Rollup](https://rollupjs.org/) for bundling and tree shaking, [PostCSS]() for CSS transpiling, and finally a simple bash script (deployReact.sh) for deployment.

You don't have to fully understand what each of these pieces in the chain are accomplishing, but the more you know about them the more you can optimize your development efforts.

In the following instruction we will show you how to use Vite to create a simple web application using the tools mentioned above. We will then demonstrate how to convert your startup into a modern web application by converting Simon to use Vite and React.

# Tic Tac Toe Code Sandbox

[link](https://codesandbox.io/s/dazzling-morning-wgcq2x?file=/App.js)

# Reactivity

> Making the UI react to changes in user input or data, is one of the architectural foundations of React. React enables reactivity with three major pieces of a React component: `props`, `state`, and `render`.

> Reactivity is the ability of a component to react to changes in its state or properties. Reactivity is what makes React so powerful. Reactivity is implemented by monitoring the state and properties of a component and then calling the `render` function whenever a change is detected. The `render` function then updates the user interface to reflect the new state or properties.

## ☑ Assignment

Create a fork of this [CodePen](https://codepen.io/leesjensen/pen/NWzYzXE) and experiment. Try changing the input from using the color and radio button, to using an edit box that reactively displays the text as you type.

Mah fork: [link](https://codepen.io/zinga331/pen/YzBdvoz)

When you are done submit your CodePen URL to the Canvas assignment.

Don't forget to update your GitHub startup repository `notes.md` with all of the things you learned and want to remember.


# React Hooks

THE FOLLOWING ARE COPIED NOTES FROM PROF. JENSEN'S REACT HOOKS NOTES

React hooks allow React function style components to be able to do everything that a classs style compononet can do and more. Additionally, as newe features are addded to React they are included as hooks. This make functtion style componenet the preferred way to develop React applications. 

You have already seen one use of hooks to declare and update state in a function component with the `useState` hook.

```jsx
function Clicker({initialCount}) {
  const [count, updateCount] = React.useState(initialCount);
  return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}

ReactDOM.render(<Clicker initialCount={3} />, document.getElementById('root'));
```

## useEffect hook

The `useEffect` hook allows you to represent lifecycle events. For example, if you want to run a function every time the component completes rendering, you could do the following.

```jsx
function UseEffectHookDemo() {
  React.useEffect(() => {
    console.log('rendered');
  });

  return <div>useEffectExample</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

You can also take action when the component cleans up by returning a cleanup function from the function registered with `useEffect`. In the following example, every time the component is clicked the state changes and so the component is rerendered. This causes both the cleanup function to be called in addition to the hook function. If the function was not rerendered then only the cleanup function would be called.

```jsx
function UseEffectHookDemo() {
  const [count, updateCount] = React.useState(0);
  React.useEffect(() => {
    console.log('rendered');

    return function cleanup() {
      console.log('cleanup');
    };
  });

  return <div onClick={() => updateCount(count + 1)}>useEffectExample {count}</div>;
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

This is useful when you want to create side effects for things such as tracking when a component is displayed or hidden, or creating and disposing of resources.

## Hook dependencies

You can control what triggers a `useEffect` hook by specifying its dependencies. In the following example we have two state variables, but we only want the `useEffect` hook to be called when the component is initially called and when the first variable is clicked. To accomplish this you pass an array of dependencies as a second parameter to the `useEffect` call.

```jsx
function UseEffectHookDemo() {
  const [count1, updateCount1] = React.useState(0);
  const [count2, updateCount2] = React.useState(0);

  React.useEffect(() => {
    console.log(`count1 effect triggered ${count1}`);
  }, [count1]);

  return (
    <ol>
      <li onClick={() => updateCount1(count1 + 1)}>Item 1 - {count1}</li>
      <li onClick={() => updateCount2(count2 + 1)}>Item 2 - {count2}</li>
    </ol>
  );
}

ReactDOM.render(<UseEffectHookDemo />, document.getElementById('root'));
```

If you specify and empty array `[]` as the hook dependency then it is only called when the component is first rendered.

Note that hooks can only be used in function style components and must be called at the top scope of the function. That means a hook cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called in the same order when a component is rendered.

# What I learned from deploying Simon

1. Make sure that you run npm install in both the service directory and the root, as both the backend and the vite frontend need to install packages properly.
1. I didn't have the dbConfig.json file in the proper directory, so I needed to move it to service.
1. Dependencies are an issue sometimes.
