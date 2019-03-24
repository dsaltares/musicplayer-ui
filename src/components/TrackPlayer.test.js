import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TrackPlayerBase } from './TrackPlayer';

Enzyme.configure({ adapter: new Adapter() });

it('renders a player for an empty track list', () => {
    const props = {
        classes: {},
        trackList: [],
        trackIndex: -1,
        nextTrack: jest.fn(),
        previousTrack: jest.fn()
    };

    const wrapper = shallow(<TrackPlayerBase {...props} />);

    expect(wrapper).toBeDefined();
});

it('renders an audio component with the selected source', () => {
    const props = {
        classes: {},
        accessToken: 'token',
        trackList: [{ id: 'track_1' }, { id: 'track_2' }],
        trackIndex: 1,
        nextTrack: jest.fn(),
        previousTrack: jest.fn()
    };

    const wrapper = shallow(<TrackPlayerBase {...props} />);

    const source = wrapper.find('audio source');
    const { src } = source.props();
    expect(src).not.toHaveLength(0);
});

it('renders next and previous track buttons', () => {
    const props = {
        classes: {},
        accessToken: 'token',
        trackList: [{ id: 'track_1' }, { id: 'track_2' }],
        trackIndex: 1,
        nextTrack: jest.fn(),
        previousTrack: jest.fn()
    };

    const wrapper = shallow(<TrackPlayerBase {...props} />);

    const previousButton = wrapper.find('WithStyles(IconButton)').at(0);
    previousButton.simulate('click');
    expect(props.previousTrack).toHaveBeenCalled();

    const nextButton = wrapper.find('WithStyles(IconButton)').at(1);
    nextButton.simulate('click');
    expect(props.nextTrack).toHaveBeenCalled();
});

it('go to the next song when the audio ends', () => {
    const props = {
        classes: {},
        accessToken: 'token',
        trackList: [{ id: 'track_1' }, { id: 'track_2' }],
        trackIndex: 1,
        nextTrack: jest.fn(),
        previousTrack: jest.fn()
    };

    const wrapper = shallow(<TrackPlayerBase {...props} />);

    const audio = wrapper.find('audio');
    audio.simulate('ended');
    expect(props.nextTrack).toHaveBeenCalled();
});

it('go to the next song when the audio errors', () => {
    const props = {
        classes: {},
        accessToken: 'token',
        trackList: [{ id: 'track_1' }, { id: 'track_2' }],
        trackIndex: 1,
        nextTrack: jest.fn(),
        previousTrack: jest.fn()
    };

    const wrapper = shallow(<TrackPlayerBase {...props} />);

    const audio = wrapper.find('audio');
    audio.simulate('error');
    expect(props.nextTrack).toHaveBeenCalled();
});
