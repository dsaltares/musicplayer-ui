import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import GoogleSignIn from './GoogleSignIn';
import TrackList from './TrackList';
import { getTracks, setGoogleCredentials } from '../actions/index';
import PlayerStates from '../constants/playerstates';

function AppContentBase(props) {
    const {
        accessToken,
        playerState,
        onGoogleSignIn,
        socket
    } = props;

    useEffect(() => {
        if (accessToken && playerState === PlayerStates.EMPTY) {
            props.getTracks(accessToken);
        }
    });

    if (!accessToken) {
        return (
            <GoogleSignIn
                onSignIn={onGoogleSignIn}
                socket={socket}
            />
        );
    }
    if (playerState === PlayerStates.LOADING) {
        return <CircularProgress variant="indeterminate" color="primary" />;
    }

    return <TrackList />;
}

AppContentBase.propTypes = {
    accessToken: PropTypes.string,
    playerState: PropTypes.oneOf(Object.keys(PlayerStates)).isRequired,
    socket: PropTypes.shape({
        connected: PropTypes.bool.isRequired
    }).isRequired,
    onGoogleSignIn: PropTypes.func.isRequired,
    getTracks: PropTypes.func.isRequired
};

AppContentBase.defaultProps = {
    accessToken: null
};

function mapStateToProps(state) {
    return {
        accessToken: state.login.credentials ? state.login.credentials.accessToken : null,
        socket: state.login.socket,
        playerState: state.tracks.state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onGoogleSignIn: payload => dispatch(setGoogleCredentials(payload)),
        getTracks: payload => dispatch(getTracks(payload))
    };
}

const AppContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContentBase);

export default AppContent;
