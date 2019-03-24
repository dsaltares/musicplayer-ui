import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrackItem from './TrackItem';

Enzyme.configure({ adapter: new Adapter() });

it('does not throw with incomplete track info', () => {
    const props = {
        track: {},
        selected: false,
        onTrackSelected: jest.fn()
    };

    const wrapper = shallow(<TrackItem {...props} />);

    const listItem = wrapper.find('WithStyles(ListItem)');
    expect(listItem.props()).toMatchObject({
        selected: false
    });

    const avatar = wrapper.find('WithStyles(Avatar)');
    expect(avatar.props()).toMatchObject({
        src: ''
    });

    const itemText = wrapper.find('WithStyles(ListItemText)');
    expect(itemText.props()).toMatchObject({
        primary: 'Unknown track',
        secondary: 'Unknown artist • Unknown album'
    });
});

it('displays track information', () => {
    const props = {
        track: {
            id: 'track_1',
            name: 'Track name',
            album: {
                title: 'Album title',
                image: [
                    { '#text': 'image_1' },
                    { '#text': 'image_2' }
                ]
            },
            artist: {
                name: 'Artist name'
            }
        },
        selected: false,
        onTrackSelected: jest.fn()
    };

    const wrapper = shallow(<TrackItem {...props} />);

    const listItem = wrapper.find('WithStyles(ListItem)');
    expect(listItem.props()).toMatchObject({
        selected: false
    });

    const avatar = wrapper.find('WithStyles(Avatar)');
    expect(avatar.props()).toMatchObject({
        src: 'image_2'
    });

    const itemText = wrapper.find('WithStyles(ListItemText)');
    expect(itemText.props()).toMatchObject({
        primary: 'Track name',
        secondary: 'Artist name • Album title'
    });
});

it('shows as selected when set to be selected', () => {
    const props = {
        track: {},
        selected: true,
        onTrackSelected: jest.fn()
    };

    const wrapper = shallow(<TrackItem {...props} />);

    const listItem = wrapper.find('WithStyles(ListItem)');
    expect(listItem.props()).toMatchObject({
        selected: true
    });
});

it('can select an unselected track', () => {
    const props = {
        track: { id: 'track_1' },
        selected: false,
        onTrackSelected: jest.fn()
    };

    const wrapper = shallow(<TrackItem {...props} />);

    const listItem = wrapper.find('WithStyles(ListItem)');
    listItem.simulate('click');
    expect(props.onTrackSelected).toHaveBeenCalledWith('track_1');
});

it('cannot select an already selected track', () => {
    const props = {
        track: { id: 'track_1' },
        selected: true,
        onTrackSelected: jest.fn()
    };

    const wrapper = shallow(<TrackItem {...props} />);

    const listItem = wrapper.find('WithStyles(ListItem)');
    listItem.simulate('click');
    expect(props.onTrackSelected).not.toHaveBeenCalled();
});
