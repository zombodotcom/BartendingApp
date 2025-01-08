// src/components/ToastContainer.jsx
import { h } from "preact";
import { Toast } from "./Toast.jsx";

/**
 * ToastContainer Component
 *
 * Props:
 *  - toasts: Array of toast objects
 *  - removeToast: Function to remove a toast by ID
 *  - position: Position of the toast container (default: 'top-end')
 */
export function ToastContainer({ toasts, removeToast, position = "top-end" }) {
  return (
    <div class={`fixed ${position} p-3`} style={{ zIndex: 1080 }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
}
