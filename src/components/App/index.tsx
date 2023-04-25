import { Memos } from 'src/components/Memos';
import { Modal } from 'src/components/Modal';
import { ModalContextProvider } from 'src/components/Modal/context';
import { MemosContextProvider } from 'src/components/Memos/context';

import './styles.css';

export function App() {
    return (
        <div className="mainWrapper" data-testid="app-test-id">
            <ModalContextProvider>
                <MemosContextProvider>
                    <div className="header">
                        <h1>My Voice Memos</h1>
                    </div>

                    <div className="body">
                        <Memos />
                    </div>

                    <Modal />
                </MemosContextProvider>
            </ModalContextProvider>
        </div>
    );
}
