import { renderHook, act } from '@testing-library/react-hooks';

import * as ModalContextModule from 'src/components/Modal/context';
import { MemoForm } from 'src/components/Memos/MemoForm';

import { useMemos } from '../hooks';

describe('useMemos', () => {
    it('should open add memo modal with correct props', () => {
        const mockDispatch = jest.fn();
        jest.spyOn(ModalContextModule, 'useModalContext').mockReturnValue({
            state: {
                isVisible: false,
                component: null,
            },
            dispatch: mockDispatch,
        });

        const { result } = renderHook(() => useMemos());
        const { handleAddMemoModalOpen } = result.current;

        act(() => {
            handleAddMemoModalOpen();
        });

        expect(mockDispatch).toBeCalledWith({
            isVisible: true,
            component: expect.any(Object),
        });
        expect(mockDispatch.mock.calls[0][0].component.type).toBe(MemoForm);
        expect(mockDispatch.mock.calls[0][0].component.props.type).toBe('CREATE');
    });
});
