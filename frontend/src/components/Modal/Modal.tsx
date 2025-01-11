import React from "react";
import classes from "./styles.module.scss";
import { FaXmark } from "react-icons/fa6";

interface Props {
  title: JSX.Element | string;

  onClose: () => void;
}

export const Modal = ({ children, title, onClose }: React.PropsWithChildren<Props>) => {
  return (
    <>
      <div className={classes.overlay}></div>
      <div className={classes.modal}>
        <div className={classes.modalTitle}>{title}</div>
        <button className={classes.modalCloseBtn} onClick={() => onClose()}>
          <FaXmark />
        </button>
        {children}
      </div>
    </>
  );
};

export const ModalContent = ({ children }: React.PropsWithChildren) => {
  return <div className={classes.modalContent}>{children}</div>;
};

export const ModalActions = ({ children }: React.PropsWithChildren) => {
  return <div>{children}</div>;
};
