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
      class="flex items-center w-full max-w-xs p-4 mb-4 text-white bg-blue-500 rounded-lg shadow-md"
      role="alert"
    >
      <div class="ml-3 text-sm font-medium">
        <strong>{title}</strong>: {message}
      </div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 bg-blue-500 text-white rounded-lg focus:ring-2 focus:ring-white p-1.5 hover:bg-blue-600 inline-flex h-8 w-8"
        aria-label="Close"
        onClick={() => onClose(id)}
      >
        <span class="sr-only">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
