import { useCallback, useEffect } from 'react';

import { Memo } from 'src/components/Memos/types';
import { useModalContext } from 'src/components/Modal/context';
import { MemoForm } from 'src/components/Memos/MemoForm';
import { useMemosContext } from 'src/components/Memos/context';

export function useMemoList() {
    const { memos, dispatch } = useMemosContext();
    const modalContext = useModalContext();

    useEffect(() => {
        const savedMemos = localStorage.getItem('memos');

        if (savedMemos) {
            const memos = JSON.parse(savedMemos) as Memo[];
            dispatch({ type: 'SET_MEMOS', payload: memos });
        }
    }, []);

    const handleEditMemo = (memo: Memo) => {
        dispatch({ type: 'SET_CURRENT_MEMO', payload: memo });

        modalContext.dispatch({
            isVisible: true,
            component: <MemoForm type="EDIT" />,
        });
    };

    const handleDeleteMemo = useCallback(
        (memo: Memo) => {
            dispatch({ type: 'DELETE_MEMO', payload: memo });
        },
        [dispatch],
    );

    const sortedMemos = memos.sort((a, b) => (b.updatedAt ?? b.id) - (a.updatedAt ?? a.id));

    return { sortedMemos, handleEditMemo, handleDeleteMemo };
}
