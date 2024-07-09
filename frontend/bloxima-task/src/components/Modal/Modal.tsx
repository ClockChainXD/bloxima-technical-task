import React from "react";
import styles from "./Modal.module.css";
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className={styles.outerContainer}
        >
            <div
                className={styles.innerContainer}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;