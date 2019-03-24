import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HeaderBase } from './Header';

Enzyme.configure({ adapter: new Adapter() });

it('does not render avatar if no profile info is set', () => {
    const props = {
        classes: {},
        toggleHelpDialog: jest.fn()
    };

    const wrapper = shallow(<HeaderBase {...props} />);

    expect(wrapper.exists('WithStyles(Avatar)')).toEqual(false);
});

it('renders avatar if the profile info is set', () => {
    const props = {
        classes: {},
        toggleHelpDialog: jest.fn(),
        profilePhoto: 'photo',
        userName: 'name'
    };

    const wrapper = shallow(<HeaderBase {...props} />);

    const header = wrapper.find('WithStyles(Avatar)');
    expect(header.props()).toEqual({
        src: 'photo',
        alt: 'name'
    });
});

it('the help button click calls toggleHelpDialog', () => {
    const props = {
        classes: {},
        toggleHelpDialog: jest.fn(),
        profilePhoto: 'photo',
        userName: 'name'
    };

    const wrapper = shallow(<HeaderBase {...props} />);

    const button = wrapper.find('WithStyles(IconButton)');
    button.simulate('click');
    expect(props.toggleHelpDialog).toHaveBeenCalled();
});
