# Acute

Acute is a lightweight but opinionated framework that allows you to build web apps using web components.

It abstracts away some of the more tedious and repetitive parts of authoring custom elements, such as attribute-property binding, event handling and templating.

## A simple component

Acute components are defined as objects. This pattern works nicely with modules:

__HelloWorld.js__

```javascript
import { html } from 'acutejs';

export default {
  props: {
    greeting: {
      default: 'Hello',
      type: String,
    },
    name: {
      default: 'world',
      type: String,
    }
  },
  render({ greeting, name }) {
    return html`<p>${ greeting }, ${ name }</p>`;
  },
};
```

## The `createApp` function

The `createApp` is used to register components with Acute.

__app.js__

```javascript
import { createApp } from 'acutejs';
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
    <script async src="bundle.js"></script>
  </head>
  <body>
    <hello-world name="Acute"></hello-world>
  </body>
</html>
```
