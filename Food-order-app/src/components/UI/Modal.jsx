import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, open, className = "", onClose }) => {
  const dialogRef = useRef();
  useEffect(() => {
    const modal = dialogRef.current;
    if (open === true) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);
  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};
