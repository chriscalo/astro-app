// MAYBE: switch to npm package runtime-detect
const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export { isBrowser, isNode };
