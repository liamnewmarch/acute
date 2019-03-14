import { createComponent } from './component.js';

export const createApp = ({
  components = {},
  plugins = [],
} = {}) => {
  for (const component of components) {
    const CustomElement = createComponent(component);
    customElements.define(CustomElement.tagName, CustomElement);
  }
};
