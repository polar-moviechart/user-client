import React from "react";
import Modal from 'react-modal';
import '../styles/modal.css';

interface CustomModalProbs {
    isOpen: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CustomModal: React.FC<CustomModalProbs> = ({ isOpen, title = '', message, onConfirm, onCancel }) => {
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
                <button onClick={onConfirm} className="modal-button">확인</button>
                <button onClick={onCancel} className="modal-close">취소</button>
            </div>
        </Modal>
    );
};

export default CustomModal;
