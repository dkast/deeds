import React from "react";
import ReactDOM from "react-dom";
import { X } from "react-feather";

const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="opacity-50 bg-black fixed top-0 left-0 w-full h-full z-30"></div>
          <div
            className="fixed top-0 left-0 w-full h-full z-40 flex items-end"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="bg-white dark:bg-gray-900 w-full h-auto mx-2 mb-10 rounded shadow-lg p-4">
              <div className="block text-right text-gray-600">
                <button onClick={hide}>
                  <X></X>
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
