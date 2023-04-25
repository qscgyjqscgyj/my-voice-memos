import { MemoList } from './MemoList';
import { useMemos } from './hooks';

export function Memos() {
    const { handleAddMemoModalOpen } = useMemos();

    return (
        <>
            <button className="button" onClick={handleAddMemoModalOpen}>
                Add memo +
            </button>

            <MemoList />
        </>
    );
}
