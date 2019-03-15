import { createComponent } from './component.js';

export const createApp = ({
  components = {},
  plugins = [],
} = {}) => {
  for (const [className, definition] of Object.entries(components)) {
    const CustomElement = createComponent(className, {
      ...definition,
      plugins,
    });
    customElements.define(CustomElement.tagName, CustomElement);
  }
};
