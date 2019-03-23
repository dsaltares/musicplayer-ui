import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import TrackItem from './TrackItem';
import { getTracks, selectTrack } from './actions/index';

class TrackListBase extends React.Component {
    componentDidMount() {
        const {
            loaded,
            accessToken
        } = this.props;

        if (!loaded) {
            this.props.getTracks(accessToken);
        }
    }

    render() {
        const { trackList, selectedTrackIndex } = this.props;
        return (
            <List>
                {
                    trackList.map((track, index) => (
                        <TrackItem
                            key={track.id}
                            track={track}
                            selected={selectedTrackIndex === index}
                            onTrackSelected={this.props.selectTrack}
                        />
                    ))
                }
            </List>
        );
    }
}

TrackListBase.propTypes = {
    trackList: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedTrackIndex: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    getTracks: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    selectTrack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trackList: state.tracks.list,
    selectedTrackIndex: state.player.trackIndex,
    loaded: state.tracks.loaded,
    accessToken: state.login.credentials.accessToken
});

const TrackList = connect(
    mapStateToProps,
    {
        getTracks,
        selectTrack
    }
)(TrackListBase);

export default TrackList;
