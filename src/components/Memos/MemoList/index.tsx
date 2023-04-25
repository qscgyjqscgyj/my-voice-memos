import { useMemoList } from './hooks';
import './styles.css';

export function MemoList() {
    const { sortedMemos, handleEditMemo, handleDeleteMemo } = useMemoList();

    return (
        <div>
            <h2>Memo List</h2>

            {sortedMemos.length === 0 && <p>No memos found</p>}

            {sortedMemos.map((memo) => (
                <div className="memoBlock" key={memo.id}>
                    <div className="description">{memo.description}</div>
                    <div className="timestamp">{memo.timestamp}</div>
                    <div className="controls">
                        <button className="button" onClick={() => handleEditMemo(memo)}>
                            Edit
                        </button>
                        <button className="button-red" onClick={() => handleDeleteMemo(memo)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
