import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MusicNote from '@material-ui/icons/MusicNote';

function TrackItem(props) {
    const { track, onTrackSelected, selected } = props;
    const trackName = track.name || 'Unknown track';
    const artist = track.artist ?
        track.artist.name :
        'Unknown artist';
    const album = track.album ?
        track.album.title :
        'Unknown album';
    const cover = track.album && track.album.image && track.album.image.length > 0 ?
        track.album.image[track.album.image.length - 1]['#text'] : '';
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
    track: PropTypes.objectOf(PropTypes.shape({

    })).isRequired,
    selected: PropTypes.bool.isRequired,
    onTrackSelected: PropTypes.func.isRequired
};

export default TrackItem;
