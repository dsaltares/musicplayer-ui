import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AppBase } from './App';

it('renders without crashing', () => {
    const props = {
        classes: {
            appContent: {}
        }
    };
    const renderer = new ShallowRenderer();
    renderer.render(<AppBase {...props} />);
});
