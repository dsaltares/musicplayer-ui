import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppBase } from './App';
import AppContent from './AppContent';
import TrackPlayer from './TrackPlayer';

Enzyme.configure({ adapter: new Adapter() });

it('renders AppContent and TrackPlayer', () => {
    const props = {
        classes: {
            appContent: {}
        }
    };

    const wrapper = shallow(<AppBase {...props} />);

    expect(wrapper.contains(<AppContent />)).toBe(true);
    expect(wrapper.contains(<TrackPlayer />)).toBe(true);
});
