import { useModalContext } from './context';
import './styles.css';

export function Modal() {
    const { state, dispatch } = useModalContext();

    if (!state || !state.isVisible) {
        return null;
    }

    const { component: Component, componentProps } = state;

    if (!Component || componentProps === undefined) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div
                    className="close-modal"
                    onClick={() =>
                        dispatch({
                            isVisible: false,
                            component: undefined,
                            componentProps: undefined,
                        })
                    }
                >
                    x
                </div>

                <Component {...componentProps} />
            </div>
        </div>
    );
}
