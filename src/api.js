// Single source for the backend base URL.
// Override in production with REACT_APP_API_URL (e.g. a deployed API).
export const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
 