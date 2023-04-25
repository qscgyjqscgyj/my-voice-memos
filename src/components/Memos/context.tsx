import { createContext, useContext, useReducer } from 'react';

import { Memo } from './types';

type Action =
    | { type: 'SET_MEMOS'; payload: Memo[] }
    | { type: 'CREATE_MEMO'; payload: Memo }
    | { type: 'DELETE_MEMO'; payload: Memo }
    | { type: 'UPDATE_MEMO'; payload: Memo }
    | { type: 'SET_CURRENT_MEMO'; payload: Memo | undefined };

type Reducer = (state: MemosContextProps, action: Action) => MemosContextProps;

function updateMemosToLocalStorage(memos: Memo[]) {
    localStorage.setItem('memos', JSON.stringify(memos));
}

const reducer: Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MEMOS':
            return { ...state, memos: action.payload };

        case 'CREATE_MEMO':
            const createdMemos = [...state.memos, action.payload];
            updateMemosToLocalStorage(createdMemos);
            return { ...state, memos: createdMemos };

        case 'DELETE_MEMO':
            const afterDeletionMemos = state.memos.filter((memo) => memo.id !== action.payload.id);
            updateMemosToLocalStorage(afterDeletionMemos);
            return { ...state, memos: afterDeletionMemos };

        case 'UPDATE_MEMO':
            const updatedMemos = state.memos.map((memo) =>
                memo.id === action.payload.id ? { ...action.payload, updatedAt: Date.now() } : memo,
            );
            updateMemosToLocalStorage(updatedMemos);
            return {
                ...state,
                memos: updatedMemos,
            };

        case 'SET_CURRENT_MEMO':
            return { ...state, currentMemo: action.payload };

        default:
            return state;
    }
};

interface MemosContextProps {
    memos: Memo[];
    dispatch: React.Dispatch<Action>;
    currentMemo: Memo | undefined;
}

const initState = {
    memos: [],
    currentMemo: undefined,
    dispatch: () => null,
};

const MemosContext = createContext<MemosContextProps>(initState);

interface MemosProviderProps {
    children: React.ReactNode;
}

export function MemosContextProvider(props: MemosProviderProps) {
    const { children } = props;

    const [state, dispatch] = useReducer(reducer, initState);
    const { memos, currentMemo } = state;

    return (
        <MemosContext.Provider value={{ memos, currentMemo, dispatch }}>
            {children}
        </MemosContext.Provider>
    );
}

export function useMemosContext() {
    return useContext(MemosContext);
}
