import { useCallback, useEffect, useState } from 'react';

import { useMemosContext } from 'src/components/Memos/context';
import { useModalContext } from 'src/components/Modal/context';

export function useMemoForm() {
    const { currentMemo, dispatch: dispatchMemos } = useMemosContext();
    const { dispatch: dispatchModal } = useModalContext();

    const [description, setDescription] = useState<string>(
        currentMemo ? currentMemo.description : '',
    );
    const [recognition, setRecognition] = useState<SpeechRecognition | undefined>();
    const [isRecording, setIsRecording] = useState<boolean>(false);

    useEffect(() => {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const speechRec = new speechRecognition();
        speechRec.continuous = false;
        speechRec.interimResults = true;
        speechRec.lang = 'en-US';

        speechRec.onresult = (e: SpeechRecognitionEvent) => {
            const transcript = e.results[0][0].transcript;

            setDescription(transcript);
        };

        speechRec.onaudiostart = () => {
            setIsRecording(true);
        };
        speechRec.onaudioend = () => {
            setIsRecording(false);
        };
        speechRec.onnomatch = () => {
            console.error('Speech not recognized');
            setIsRecording(false);
        };
        speechRec.onerror = (error) => {
            console.error(error);
            setIsRecording(false);
        };

        setRecognition(speechRec);

        return () => {
            setDescription('');

            if (recognition) {
                recognition.abort();
            }

            if (currentMemo) {
                dispatchMemos({
                    type: 'SET_CURRENT_MEMO',
                    payload: undefined,
                });
            }
        };
    }, [currentMemo, dispatchMemos, setRecognition]);

    const handleDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
        },
        [setDescription],
    );

    const handleCreateMemo = useCallback(() => {
        dispatchMemos({
            type: 'CREATE_MEMO',
            payload: {
                id: Date.now(),
                description,
                timestamp: new Date().toLocaleString(),
            },
        });

        dispatchModal({ isVisible: false, component: undefined });
    }, [dispatchMemos, description]);

    const handleSaveMemo = useCallback(() => {
        if (currentMemo) {
            dispatchMemos({ type: 'UPDATE_MEMO', payload: { ...currentMemo, description } });
            dispatchModal({ isVisible: false, component: undefined });
        }
    }, [dispatchMemos, currentMemo, description]);

    const handleStartRecording = useCallback(() => {
        if (recognition) {
            recognition.start();
        }
    }, [recognition]);

    const handleStopRecording = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return {
        description,
        isRecording,
        handleDescriptionChange,
        handleCreateMemo,
        handleSaveMemo,
        handleStartRecording,
        handleStopRecording,
    };
}
