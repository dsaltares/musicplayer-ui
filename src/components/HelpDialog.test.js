import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HelpDialogBase } from './HelpDialog';

Enzyme.configure({ adapter: new Adapter() });

it('renders in the closed state', () => {
    const props = {
        isOpen: false,
        toggleHelpDialog: jest.fn()
    };

    const wrapper = shallow(<HelpDialogBase {...props} />);

    const dialog = wrapper.at(0);
    expect(dialog.name()).toEqual('WithStyles(Dialog)');
    expect(dialog.props().open).toEqual(false);
});

it('renders in the open state', () => {
    const props = {
        isOpen: true,
        toggleHelpDialog: jest.fn()
    };

    const wrapper = shallow(<HelpDialogBase {...props} />);

    const dialog = wrapper.at(0);
    expect(dialog.name()).toEqual('WithStyles(Dialog)');
    expect(dialog.props().open).toEqual(true);
});

it('close calls toggleHelpDialog', () => {
    const props = {
        isOpen: true,
        toggleHelpDialog: jest.fn()
    };

    const wrapper = shallow(<HelpDialogBase {...props} />);

    const dialog = wrapper.at(0);
    dialog.simulate('close');

    expect(props.toggleHelpDialog).toHaveBeenCalled();
});
