import { MemoFormProps } from 'src/components/Memos/MemoForm/types';

export interface ModalProps {
    isVisible: boolean;
    component: ((props: MemoFormProps) => JSX.Element) | undefined;
    type: MemoFormProps['type'];
}

export interface ModalContextProviderProps {
    children: React.ReactNode;
}
