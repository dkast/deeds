import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="opacity-50 bg-black fixed top-0 left-0 w-full h-full z-30"></div>
          <div
            className="fixed top-0 left-0 w-full h-full z-40 flex"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="bg-white">OK</div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
