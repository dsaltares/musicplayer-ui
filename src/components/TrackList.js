import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import TrackItem from './TrackItem';
import { selectTrack } from '../actions/index';

function TrackListBase(props) {
    const { trackList, selectedTrackIndex } = props;
    return (
        <List>
            {
                trackList.map((track, index) => (
                    <TrackItem
                        key={track.id}
                        track={track}
                        selected={selectedTrackIndex === index}
                        onTrackSelected={props.selectTrack}
                    />
                ))
            }
        </List>
    );
}

TrackListBase.propTypes = {
    trackList: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedTrackIndex: PropTypes.number.isRequired,
    selectTrack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trackList: state.tracks.list,
    selectedTrackIndex: state.tracks.trackIndex,
    loaded: state.tracks.loaded,
    accessToken: state.login.credentials.accessToken
});

const TrackList = connect(
    mapStateToProps,
    { selectTrack }
)(TrackListBase);

export default TrackList;
