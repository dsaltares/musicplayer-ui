import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import { withStyles } from '@material-ui/core/styles';
import { nextTrack } from './actions/index';
import { AppBar } from '@material-ui/core';

const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: '0px'
    },
    button: {
        margin: theme.spacing.unit
    }
});

class TrackPlayerBase extends React.Component {
    constructor(props) {
        super(props);

        this.audioRef = React.createRef();
    }

    componentDidUpdate() {
        const { current: audio } = this.audioRef;
        audio.pause();
        audio.load();
        audio.play();
    }

    render() {
        const {
            trackList,
            trackIndex,
            accessToken,
            classes
        } = this.props;

        if (trackIndex < 0 || trackIndex >= trackList.length) {
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
                    spacing={16}
                >
                    <IconButton variant="contained" className={classes.button}>
                        <SkipPrevious fontSize="large" color="inherit" />
                    </IconButton>
                    <audio
                        controls
                        autoPlay
                        ref={this.audioRef}
                        preload="none"
                        onEnded={(this.props.nextTrack)}
                    >
                        <source src={src} type="audio/mpeg" />
                        Your browser does not support the audio tag.
                    </audio>
                    <IconButton variant="contained" className={classes.button}>
                        <SkipNext fontSize="large" />
                    </IconButton>
                </Grid>
            </AppBar>
        );
    }
}

function getTrackSrc(id, accessToken) {
    const urlBase = 'http://localhost:8080/api/track';
    return encodeURI(`${urlBase}?id=${id}&google_token=${accessToken}`);
}

TrackPlayerBase.propTypes = {
    trackList: PropTypes.arrayOf(PropTypes.object).isRequired,
    trackIndex: PropTypes.number.isRequired,
    accessToken: PropTypes.string.isRequired,
    nextTrack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trackList: state.tracks.list,
    trackIndex: state.player.trackIndex,
    accessToken: state.login.credentials.accessToken
});

const mapDispatchToProps = dispatch => ({
    nextTrack: () => dispatch(nextTrack())
});

const ConnectedTrackPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackPlayerBase);

const TrackPlayer = withStyles(styles)(ConnectedTrackPlayer);

export default TrackPlayer;
