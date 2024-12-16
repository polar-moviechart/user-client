import { useCallback, useState } from "react";

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
}

export function useModal() {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        title: '',
        message: '',
    });

    const openModal = (title: string, message: string) => {
        setModalState({ isOpen: true, title, message });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, title: '', message: '' });
    }

    return {
        openModal,
        closeModal,
        modalState,
    };
};

export default useModal;