import { createContext, useContext, useState } from 'react';

import { ModalContextProviderProps, ModalProps } from './types';

interface ModalContextProps {
    state: ModalProps | undefined;
    dispatch: React.Dispatch<ModalProps>;
}

export const ModalContext = createContext<ModalContextProps>({
    state: { isVisible: false, component: undefined, type: undefined },
    dispatch: () => null,
});

export function ModalContextProvider(props: ModalContextProviderProps) {
    const { children } = props;

    const [modalState, setModalState] = useState<ModalProps | undefined>();

    return (
        <ModalContext.Provider value={{ state: modalState, dispatch: setModalState }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModalContext = () => useContext(ModalContext);
