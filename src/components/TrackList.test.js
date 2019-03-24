import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TrackListBase } from './TrackList';

Enzyme.configure({ adapter: new Adapter() });

it('renders an empty list', () => {
    const props = {
        trackList: [],
        selectedTrackIndex: -1,
        selectTrack: jest.fn()
    };

    const wrapper = shallow(<TrackListBase {...props} />);

    const list = wrapper.find('WithStyles(List)');
    expect(list.children()).toHaveLength(0);
});

it('renders track items', () => {
    const tracks = [
        { id: 'track_1' },
        { id: 'track_2' },
        { id: 'track_3' }
    ];
    const props = {
        trackList: tracks,
        selectedTrackIndex: 1,
        selectTrack: jest.fn()
    };

    const wrapper = shallow(<TrackListBase {...props} />);

    const list = wrapper.find('WithStyles(List)');
    const trackItems = list.find('TrackItem');
    expect(trackItems).toHaveLength(tracks.length);
    trackItems.forEach((trackItem, index) => {
        expect(trackItem.props()).toMatchObject({
            track: tracks[index],
            selected: index === 1,
            onTrackSelected: props.selectTrack
        });
    });
});
