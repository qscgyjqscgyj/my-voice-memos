import { renderHook, act } from '@testing-library/react-hooks';

import * as MemosContextModule from 'src/components/Memos/context';
import * as ModalContextModule from 'src/components/Modal/context';
import { useMemoList } from 'src/components/Memos/MemoList/hooks';
import { MemoForm } from 'src/components/Memos/MemoForm';

import { Memo } from '../types';

describe('useMemoList', () => {
    let mockDispatch: jest.Mock<any, any>;
    let mockModalDispatch: jest.Mock<any, any>;
    let mockLocalStorageGetItem: jest.SpyInstance<string | null, [key: string]>;

    const mockMemos: Memo[] = [{ id: 1, description: 'Test Memo', timestamp: '2020-01-01' }];

    beforeEach(() => {
        mockDispatch = jest.fn();
        jest.spyOn(MemosContextModule, 'useMemosContext').mockReturnValue({
            memos: [],
            currentMemo: undefined,
            dispatch: mockDispatch,
        });

        mockModalDispatch = jest.fn();
        jest.spyOn(ModalContextModule, 'useModalContext').mockReturnValue({
            state: {
                isVisible: false,
                component: undefined,
                type: undefined,
            },
            dispatch: mockModalDispatch,
        });

        mockLocalStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockLocalStorageGetItem.mockReturnValue(JSON.stringify(mockMemos));
    });

    it('should call dispatch with SET_MEMOS action when memos are retrieved from localStorage', () => {
        renderHook(() => useMemoList());

        expect(mockLocalStorageGetItem).toBeCalledWith('memos');
        expect(mockDispatch).toBeCalledWith({
            type: 'SET_MEMOS',
            payload: mockMemos,
        });
    });

    it('should call dispatch with DELETE_MEMO action when handleDeleteMemo is called', () => {
        const { result } = renderHook(() => useMemoList());
        const { handleDeleteMemo } = result.current;

        act(() => {
            handleDeleteMemo(mockMemos[0]);
        });

        expect(mockDispatch).toBeCalledWith({
            type: 'DELETE_MEMO',
            payload: mockMemos[0],
        });
    });

    it('should call modalContext.dispatch with correct props when handleEditMemo is called', () => {
        const { result } = renderHook(() => useMemoList());
        const { handleEditMemo } = result.current;

        act(() => {
            handleEditMemo(mockMemos[0]);
        });

        expect(mockDispatch).toBeCalledWith({
            type: 'SET_CURRENT_MEMO',
            payload: mockMemos[0],
        });
        expect(mockModalDispatch).toBeCalledWith({
            isVisible: true,
            component: MemoForm,
            type: 'EDIT',
        });
        expect(mockModalDispatch.mock.calls[0][0].component).toBe(MemoForm);
    });
});
