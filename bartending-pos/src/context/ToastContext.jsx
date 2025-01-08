// src/context/ToastContext.jsx
import { createContext } from "preact";

export const ToastContext = createContext({
  showToast: (title, message, duration) => {},
});
