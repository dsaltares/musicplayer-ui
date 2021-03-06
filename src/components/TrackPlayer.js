import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import { withStyles } from '@material-ui/core/styles';
import t from 'typy';
import { nextTrack, previousTrack } from '../actions/index';
import Endpoints from '../constants/endpoints';

const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: '0px'
    },
    button: {
        margin: theme.spacing.unit
    }
});

export class TrackPlayerBase extends React.Component {
    constructor(props) {
        super(props);

        this.audioRef = React.createRef();
    }

    componentDidUpdate() {
        const { current: audio } = this.audioRef;
        if (audio) {
            audio.pause();
            audio.load();
            audio.play().catch(() => {});
        }
    }

    render() {
        const {
            trackList,
            trackIndex,
            accessToken,
            classes
        } = this.props;

        if (trackIndex < 0 || trackIndex >= trackList.length || !accessToken) {
            return (<div />);
        }

        const trackId = trackList[trackIndex].id;
        const src = getTrackSrc(trackId, accessToken);
        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <IconButton
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.props.previousTrack}
                    >
                        <SkipPrevious fontSize="large" />
                    </IconButton>
                    <audio
                        crossOrigin="anonymous"
                        controls
                        ref={this.audioRef}
                        preload="none"
                        onEnded={this.props.nextTrack}
                        onError={this.props.nextTrack}
                    >
                        <source src={src} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                    <IconButton
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.props.nextTrack}
                    >
                        <SkipNext fontSize="large" />
                    </IconButton>
                </Grid>
            </AppBar>
        );
    }
}

function getTrackSrc(id, accessToken) {
    return encodeURI(`${Endpoints.MUSIC_PLAYER}/api/track?id=${id}&google_token=${accessToken}`);
}

TrackPlayerBase.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    trackList: PropTypes.arrayOf(PropTypes.object).isRequired,
    trackIndex: PropTypes.number.isRequired,
    accessToken: PropTypes.string,
    nextTrack: PropTypes.func.isRequired,
    previousTrack: PropTypes.func.isRequired
};

TrackPlayerBase.defaultProps = {
    accessToken: undefined
};

const mapStateToProps = state => ({
    trackList: state.tracks.list,
    trackIndex: state.tracks.trackIndex,
    accessToken: t(state, 'login.credentials.accessToken').safeObject
});

const mapDispatchToProps = dispatch => ({
    nextTrack: () => dispatch(nextTrack()),
    previousTrack: () => dispatch(previousTrack())
});

const ConnectedTrackPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackPlayerBase);

const TrackPlayer = withStyles(styles)(ConnectedTrackPlayer);

export default TrackPlayer;
