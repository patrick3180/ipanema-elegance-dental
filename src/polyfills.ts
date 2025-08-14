// Polyfills for browser environment
import process from 'process/browser';

// Make process available globally for contentful SDK
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window.global || window;
  // @ts-ignore
  window.process = process;
  // @ts-ignore
  globalThis.process = process;
}

export default process;