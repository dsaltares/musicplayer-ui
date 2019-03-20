import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function TrackListBase(props) {
    const { trackList } = props;
    return (
        <ul>
            {
                trackList.map(track => <li key={track.id}>{track.name}</li>)
            }
        </ul>
    );
}

TrackListBase.propTypes = {
    trackList: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({
    trackList: state.tracks.list
});

const TrackList = connect(
    mapStateToProps,
    null
)(TrackListBase);

export default TrackList;
