import { useCallback } from 'react';

import { useModalContext } from 'src/components/Modal/context';

import { MemoForm } from './MemoForm';

export function useMemos() {
    const { dispatch } = useModalContext();

    const handleAddMemoModalOpen = useCallback(() => {
        dispatch({
            isVisible: true,
            component: MemoForm,
            componentProps: { type: 'CREATE' },
        });
    }, [dispatch]);

    return { handleAddMemoModalOpen };
}
