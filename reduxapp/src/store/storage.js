import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Fallback storage for non-browser environments (e.g., server-side rendering)
const createNoopStorage = () => ({
  getItem(_key) {
    return Promise.resolve(null); // Return `null` for nonexistent items
  },
  setItem(_key, _value) {
    return Promise.resolve(); // Simulate successful storage
  },
  removeItem(_key) {
    return Promise.resolve(); // Simulate successful removal
  },
});

// Conditionally use localStorage or fallback storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // Use `localStorage` in browser environments
    : createNoopStorage(); // Use fallback storage for non-browser environments

export default storage;
