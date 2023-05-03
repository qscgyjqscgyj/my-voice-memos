import { useModalContext } from './context';
import './styles.css';

export function Modal() {
    const { state, dispatch } = useModalContext();

    if (state && state.component && state.isVisible) {
        const { component, type } = state;

        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div
                        className="close-modal"
                        onClick={() =>
                            dispatch({ isVisible: false, component: undefined, type: undefined })
                        }
                    >
                        x
                    </div>
                    {component({ type: type })}
                </div>
            </div>
        );
    }

    return null;
}
