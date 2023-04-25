import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { App } from '.';

describe('App', () => {
    it('should render the App component with Memos and Modal components', () => {
        const { getByTestId } = render(<App />);

        const appWrapper = getByTestId('app-test-id');
        expect(appWrapper).toBeInTheDocument();
    });
});
