// src/components/Modal.jsx
import { h } from "preact";
import { useEffect } from "preact/hooks";

/**
 * Modal Component
 *
 * Props:
 *  - isOpen: Boolean indicating if the modal is open
 *  - onClose: Function to call when closing the modal
 *  - title: Modal title
 *  - children: Modal body content
 */
export function Modal({ isOpen, onClose, title, children }) {
  // Close modal on ESC key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close when clicking outside the modal content
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold" id="modal-title">
            {title}
          </h2>
          <button
            class="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
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
        {children}
      </div>
    </div>
  );
}
