import React from "react";
import Modal from 'react-modal';
import '../styles/modal.css';

interface CustomModalProbs {
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const CustomModal: React.FC<CustomModalProbs> = ({
    isOpen,
    title = '',
    message,
    onConfirm = () => {},
    onCancel = () => {},
    confirmText = '확인',
    cancelText = '취소'
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            contentLabel={title}
            className="modal"
            overlayClassName="modal-overlay"
        >
            {title && <h2>{title}</h2>}
            <p>
                {message.split("\n").map((item, index) => (
                <React.Fragment key={index}>
                    {item}
                    <br />
                </React.Fragment>
                ))}
            </p>
            <div className="modal-buttons">
                <button onClick={onConfirm} className="modal-button">{confirmText}</button>
                <button onClick={onCancel} className="modal-close">{cancelText}</button>
            </div>
        </Modal>
    );
};

export default CustomModal;
