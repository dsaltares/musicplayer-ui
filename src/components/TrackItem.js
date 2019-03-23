import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MusicNote from '@material-ui/icons/MusicNote';
import t from 'typy';

function TrackItem(props) {
    const { track, onTrackSelected, selected } = props;

    const trackName = track.name || 'Unknown track';
    const artist = t(track, 'artist.name').safeObject || 'Unknown artist';
    const album = t(track, 'album.title').safeObject || 'Unknown album';
    const covers = t(track, 'album.image').safeObject || [];
    const cover = covers.length > 0 ?
        covers[covers.length - 1]['#text'] : '';

    const onClick = selected ?
        () => {} :
        () => {
            onTrackSelected(track.id);
        };

    return (
        <ListItem button onClick={onClick} selected={selected}>
            <ListItemIcon>
                <MusicNote />
            </ListItemIcon>
            <ListItemAvatar>
                <Avatar src={cover} />
            </ListItemAvatar>
            <ListItemText
                primary={trackName}
                secondary={`${artist} • ${album}`}
            />
        </ListItem>
    );
}

TrackItem.propTypes = {
    track: PropTypes.shape({
        artist: PropTypes.shape({
            name: PropTypes.string
        }),
        album: PropTypes.shape({
            title: PropTypes.string,
            image: PropTypes.arrayOf(PropTypes.shape({
                '#shape': PropTypes.string
            }))
        })
    }).isRequired,
    selected: PropTypes.bool.isRequired,
    onTrackSelected: PropTypes.func.isRequired
};

export default TrackItem;
