import Acute from './acute.js';

export const getTagName = (className) => {
  const element = document.createElement('div');
  element.dataset[className] = '';
  return element.attributes[0].name.substr(6);
};

export const createComponent = (className, definition) => {
  const observedAttributes = Object.keys(definition.props || {});
  const tagName = getTagName(className);

  class Component extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.acute = new Acute(this, definition);
      this.acute.emit('create');
    }

    attributeChangedCallback() {
      this.acute.emit('attributechange');
      this.acute.render();
    }

    connectedCallback() {
      this.acute.emit('connect');
      this.acute.render();
    }

    disconnectedCallback() {
      this.acute.emit('disconnect');
    }
  }

  return Object.assign(Component, {
    observedAttributes,
    tagName,
  });
};
