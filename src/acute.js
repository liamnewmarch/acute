import { getDescriptor } from './descriptors.js';
import { defaultRenderStrategy } from './render.js';

export default class {
  constructor(element, {
    events = {},
    props = {},
    render,
    renderStrategy = defaultRenderStrategy,
  }) {
    this.boundFunctions = new Map();
    this.element = element;
    this.eventListeners = [];
    this.props = {};
    this.render = render;
    this.render = renderStrategy(render).bind(this, this);

    for (const [key, config] of Object.entries(props)) {
      const descriptor = getDescriptor(config.type)(element, key, config.default);
      Object.defineProperty(this.props, key, descriptor);
    }

    for (const [type, fn] of Object.entries(events)) {
      this.eventListeners.push([type, this.bind(fn)]);
    }

    this.element.addEventListener('connect', () => {
      for (const eventListener of this.eventListeners) {
        this.element.addEventListener(...eventListener);
      }
    });

    this.element.addEventListener('disconnect', () => {
      for (const eventListener of this.eventListeners) {
        this.element.removeEventListener(...eventListener);
      }
    });
  }

  bind(fn) {
    if (this.boundFunctions.has(fn)) {
      return this.boundFunctions.get(fn);
    } else {
      const bound = fn.bind(this);
      this.boundFunctions.set(fn, bound);
      return bound;
    }
  }

  find(...args) {
    return this.element.shadowRoot.querySelector(...args);
  }

  findAll(...args) {
    return this.element.shadowRoot.querySelectorAll(...args);
  }

  emit(event, options) {
    this.element.dispatchEvent(new CustomEvent(event, options));
  }

  off(type, fn) {
    const boundFn = this.bind(fn);
    this.element.removeEventListener(type, boundFn);
    this.eventListeners.slice(this.eventListeners.findIndex((value) => {
      return value[0] === type && value[1] === boundFn;
    }), 1);
  }

  on(type, fn) {
    const boundFn = this.bind(fn);
    this.element.addEventListener(type, boundFn);
    this.eventListeners.push([type, boundFn]);
  }
}
