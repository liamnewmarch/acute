export const defaultRenderStrategy = (fn) => {
  return (component) => {
    const result = fn(component.props);
    if (component.element.shadowRoot.innerHTML !== result) {
      component.element.shadowRoot.innerHTML = result;
    }
  };
};
