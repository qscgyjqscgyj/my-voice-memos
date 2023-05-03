import { createContext, useContext, useState } from 'react';

import { MemoFormProps } from 'src/components/Memos/MemoForm/types';

import { ModalContextProviderProps, ModalProps } from './types';

interface ModalContextProps {
    state: ModalProps<MemoFormProps> | undefined;
    dispatch: React.Dispatch<ModalProps<MemoFormProps>>;
}

export const ModalContext = createContext<ModalContextProps>({
    state: { isVisible: false, component: undefined, componentProps: undefined },
    dispatch: () => null,
});

export function ModalContextProvider(props: ModalContextProviderProps) {
    const { children } = props;

    const [modalState, setModalState] = useState<ModalProps<MemoFormProps> | undefined>();

    return (
        <ModalContext.Provider value={{ state: modalState, dispatch: setModalState }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModalContext = () => useContext(ModalContext);
