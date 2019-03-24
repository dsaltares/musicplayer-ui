import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppContentBase } from './AppContent';
import PlayerStates from '../constants/playerstates';

Enzyme.configure({ adapter: new Adapter() });

it('renders GoogleSignIn when there are not set credentials', () => {
    const props = {
        accessToken: null,
        playerState: PlayerStates.EMPTY,
        onGoogleSignIn: jest.fn(),
        getTracks: jest.fn(),
        socket: { connected: true }
    };

    const wrapper = shallow(<AppContentBase {...props} />);

    const signIn = wrapper.at(0);
    expect(signIn.name()).toEqual('GoogleSignIn');
    expect(signIn.props()).toEqual({
        onSignIn: props.onGoogleSignIn,
        socket: props.socket
    });
});

it('renders loading indicator when the player is loading', () => {
    const props = {
        accessToken: 'token',
        playerState: PlayerStates.LOADING,
        onGoogleSignIn: jest.fn(),
        getTracks: jest.fn(),
        socket: { connected: true }
    };

    const wrapper = shallow(<AppContentBase {...props} />);

    const signIn = wrapper.at(0);
    expect(signIn.name()).toEqual('WithStyles(CircularProgress)');
});

it('renders TrackList when the player is ready', () => {
    const props = {
        accessToken: 'token',
        playerState: PlayerStates.LOADED,
        onGoogleSignIn: jest.fn(),
        getTracks: jest.fn(),
        socket: { connected: true }
    };

    const wrapper = shallow(<AppContentBase {...props} />);

    const signIn = wrapper.at(0);
    expect(signIn.name()).toEqual('Connect(TrackListBase)');
});
