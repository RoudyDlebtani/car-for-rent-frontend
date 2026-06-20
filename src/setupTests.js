// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// jsdom (via CRA's Jest 27) doesn't expose TextEncoder/TextDecoder, which React
// Router's CJS build instantiates at import time. Polyfill from Node's util.
if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;

// jsdom doesn't implement IntersectionObserver (used by useInView) — stub it so
// landing sections can mount in tests without throwing.
if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Stub fetch so component effects that call the API don't hit the network in
// tests; returns an empty, successful payload shaped like the real responses.
if (typeof global.fetch === 'undefined' || !global.fetch._isStub) {
  const stub = () =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true, data: [] }) });
  stub._isStub = true;
  global.fetch = stub;
}
