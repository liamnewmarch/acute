import { createComponent } from './component.js';

export const createApp = ({
  components = {},
  plugins = [],
} = {}) => {
  for (const [className, component] of Object.entries(components)) {
    const CustomElement = createComponent(className, component);
    for (const plugin of plugins) plugin(CustomElement);
    customElements.define(CustomElement.tagName, CustomElement);
  }
};
