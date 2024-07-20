import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ModalContextType {
    modals: { [key: string]: { visible: boolean; modalText?: string; confirmLoading?: boolean } };
    showModal: (modalName: string, modalProps?: ModalProps) => void;
    hideModal: (modalName: string) => void;
}

interface ModalProps {
    modalText?: string;
    confirmLoading?: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<{ [key: string]: { visible: boolean; modalText?: string; confirmLoading?: boolean } }>({});

    const showModal = useCallback((modalName: string, modalProps: ModalProps = {}) => {
        setModals(modals => ({ ...modals, [modalName]: { visible: true, ...modalProps } }));
    }, []);

    const hideModal = useCallback((modalName: string) => {
        setModals(modals => ({ ...modals, [modalName]: { visible: false } }));
    }, []);

    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
