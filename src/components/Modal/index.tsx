import { useModalContext } from './context';
import './styles.css';

export function Modal() {
    const { state, dispatch } = useModalContext();

    if (state && state.isVisible) {
        const { component } = state;

        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div
                        className="close-modal"
                        onClick={() => dispatch({ isVisible: false, component: undefined })}
                    >
                        x
                    </div>
                    {component}
                </div>
            </div>
        );
    }

    return null;
}
