import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import GoogleSignIn from './GoogleSignIn';
import TrackList from './TrackList';
import TrackPlayer from './TrackPlayer';
import { setGoogleCredentials } from './actions';

function AppContentBase(props) {
    const {
        accessToken,
        loading,
        onGoogleSignIn,
        socket
    } = props;

    if (loading) {
        return <CircularProgress variant="indeterminate" />;
    }

    if (!accessToken) {
        return (
            <GoogleSignIn
                onSignIn={onGoogleSignIn}
                socket={socket}
            />
        );
    }

    return (
        <div>
            <TrackList />
            <TrackPlayer />
        </div>
    );
}

AppContentBase.propTypes = {
    accessToken: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    socket: PropTypes.shape({
        connected: PropTypes.bool.isRequired
    }).isRequired,
    onGoogleSignIn: PropTypes.func.isRequired
};

AppContentBase.defaultProps = {
    accessToken: null
};

function mapStateToProps(state) {
    return {
        accessToken: state.login.credentials ? state.login.credentials.accessToken : null,
        socket: state.login.socket,
        loading: state.tracks.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onGoogleSignIn: payload => dispatch(setGoogleCredentials(payload))
    };
}

const AppContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContentBase);

export default AppContent;
