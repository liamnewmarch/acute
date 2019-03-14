import { createComponent } from './component.js';

export const createApp = ({
  components = {},
  plugins = [],
} = {}) => {
  for (const [className, component] of Object.entries(components)) {
    const CustomElement = createComponent(className, component);
    customElements.define(CustomElement.tagName, CustomElement);
  }
};
