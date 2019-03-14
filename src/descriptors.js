export const descriptors = new Map();

descriptors.set(String, (element, key, defaultValue) => ({
  get() {
    if (element.hasAttribute(key)) {
      return element.getAttribute(key);
    } else {
      return defaultValue;
    }
  },
  set(value) {
    element.setAttribute(key, value);
  },
}));

descriptors.set(Number, (element, key, defaultValue) => ({
  get() {
    const value = Number.parseFloat(element.getAttribute(key));
    return Number.isNaN(value) ? defaultValue : value;
  },
  set(value) {
    element.setAttribute(key, value);
  },
}));

descriptors.set(Boolean, (element, key) => ({
  get() {
    return element.hasAttribute(key);
  },
  set(value) {
    if (value) {
      element.setAttribute(key, '');
    } else {
      element.removeAttribute(key);
    }
  },
}));

descriptors.set(Date, (element, key, defaultValue) => ({
  get() {
    try {
      return Date.parse(element.getAttribute(key));
    } catch (error) {
      return defaultValue;
    }
  },
  set(value) {
    const isoString = Date.parse(value).toISOString();
    element.setAttribute(key, isoString);
  },
}));

export const getDescriptor = (type) => {
  if (descriptors.has(type)) {
    return descriptors.get(type);
  } else {
    console.warn(`Acute: No attribute descriptor for type ${type.name}, using String default.`);
    return descriptors.get(String);
  }
};
