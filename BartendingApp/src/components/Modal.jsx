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
 *  - footer: Modal footer content (optional)
 */
export function Modal({ isOpen, onClose, title, children, footer }) {
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
      class="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      onClick={onClose} // Close when clicking outside the modal content
    >
      <div
        class="modal-dialog"
        role="document"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-title">
              {title}
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div class="modal-body">{children}</div>
          {footer && <div class="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
