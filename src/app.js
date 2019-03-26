import { createComponent } from './component.js';

export const createApp = ({
  components = {},
  plugins = [],
} = {}) => {
  for (const [className, definition] of Object.entries(components)) {
    const Component = createComponent(className, { plugins, ...definition });
    customElements.define(Component.tagName, Component);
  }
};
