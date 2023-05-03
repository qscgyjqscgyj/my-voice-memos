import { useMemoForm } from './hooks';
import { MemoFormProps } from './types';
import './styles.css';

export const MemoForm = (props: MemoFormProps) => {
    const { type } = props;

    const {
        isRecording,
        description,
        handleDescriptionChange,
        handleCreateMemo,
        handleSaveMemo,
        handleStartRecording,
        handleStopRecording,
    } = useMemoForm();

    return (
        <div>
            <h2>{type === 'CREATE' ? 'Create' : 'Update'} Memo</h2>

            <div className="memoFormBody">
                <div className="controls">
                    <button
                        className={isRecording ? 'button-red' : 'button-green'}
                        onClick={isRecording ? handleStopRecording : handleStartRecording}
                    >
                        {isRecording ? 'Stop recording' : 'Fill by voice'}
                    </button>
                </div>

                <div className="description">
                    <textarea
                        className="input"
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div className="createButton">
                    {type === 'CREATE' ? (
                        <button
                            className="button-green"
                            disabled={!description}
                            onClick={handleCreateMemo}
                        >
                            Create Memo
                        </button>
                    ) : (
                        <button className="button-green" onClick={handleSaveMemo}>
                            Save Memo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
