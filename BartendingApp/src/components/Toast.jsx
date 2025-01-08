// src/components/Toast.jsx
import { h } from "preact";
import { useEffect } from "preact/hooks";

/**
 * Toast Component
 *
 * Props:
 *  - id: Unique identifier for the toast
 *  - title: Toast title
 *  - message: Toast message
 *  - onClose: Function to call when the toast is closed
 *  - duration: Time in milliseconds before the toast auto-closes (default: 3000)
 */
export function Toast({ id, title, message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <div
      class="toast show align-items-center text-white bg-primary border-0 mb-2"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <strong>{title}</strong>: {message}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          onClick={() => onClose(id)}
        ></button>
      </div>
    </div>
  );
}
