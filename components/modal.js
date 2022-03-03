import React from "react";
import ReactDOM from "react-dom";
import { X } from "react-feather";
import { motion } from "framer-motion";

const Modal = React.forwardRef(({ isShowing, hide, children }, ref) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="fixed top-0 left-0 z-30 h-full w-full bg-black opacity-50"></div>
          <div
            className="fixed top-0 left-0 z-40 flex h-full w-full items-end"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <motion.div
              initial={{ y: 300, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mx-2 mb-10 h-auto w-full rounded bg-white p-4 shadow-lg dark:bg-gray-900"
            >
              <div className="block text-right text-gray-600">
                <button onClick={hide}>
                  <X></X>
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null
);

Modal.displayName = "Modal";

export default Modal;
