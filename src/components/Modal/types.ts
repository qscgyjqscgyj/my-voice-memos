export interface ModalProps<T> {
    isVisible: boolean;
    component: ((props: T) => JSX.Element) | undefined;
    componentProps: T | undefined;
}

export interface ModalContextProviderProps {
    children: React.ReactNode;
}
