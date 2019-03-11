# Acute

Acute is a lightweight but opinionated framework that allows you to build web apps using web components.

It abstracts away some of the more tedious and repetitive parts of authoring custom elements, such as attribute-property binding, event handling and templating.A

## A simple component

Acute components are defined as objects. This pattern works really nicely with modules:

__HelloWorld.js__

```javascript
export default {
  props: {
    greeting: String,
    name: String,
  },
  state: {
    greeting: 'Hello',
    name: 'world',
  },
  render({ greeting, name }) {
    html`<p>${ greeting }, ${ name }</p>`;
  },
};
```

## The `createApp` function

The `createApp` is used to register components with Acute. When an app is created, unknown elements encountered in the DOM are loaded lazily.

__app.js__

```javascript
import { createApp } from 'acute';
import HelloWorld from './HelloWorld.js';

createApp({
  components: {
    HelloWorld,
  },
});
```

## Your HTML file

Bootstrapping your app is as simple as including your base components.

__index.html__

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <hello-world name="Acute"></hello-world>
  </body>
</html>
```

