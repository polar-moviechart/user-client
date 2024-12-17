import { useCallback, useState } from "react";

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
}

export function useModal() {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => window.location.href = '/login',
    });

    const openModal = (title: string, message: string) => {
        setModalState({ isOpen: true, title, message });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, title: '', message: '' });
    };

    const onConfirm = () => {
        window.location.href = '/login';
    };

    return {
        openModal,
        closeModal,
        onConfirm,
        modalState,
    };
};

export default useModal;