export default function() {
  throw new Error(
      'Acute: No render strategy has been set, use a plugin e.g. ' +
      '@acutejs/plugin-lit-html');
}
