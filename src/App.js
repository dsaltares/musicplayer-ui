import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import GoogleSignIn from './GoogleSignIn';
import TrackList from './TrackList';
import { setGoogleCredentials } from './actions';


class AppBase extends React.Component {
    render() {
        const {
            accessToken,
            loading,
            onGoogleSignIn,
            socket
        } = this.props;

        let content = null;
        if (accessToken && !loading) {
            content = <TrackList />;
        } else if (accessToken && loading) {
            content = <CircularProgress variant="indeterminate" />;
        } else {
            content = <GoogleSignIn
                onSignIn={onGoogleSignIn}
                socket={socket} />;
        }
        return (
            <div>
                <AppBar position="static">
                    <Typography variant="h3" color="inherit">
                        Music Player
                    </Typography>
                </AppBar>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    { content }
                </Grid>
            </div>
        )
    }
}

AppBase.propTypes = {
    accessToken: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    socket: PropTypes.any.isRequired
};

AppBase.defaultProps = {
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

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBase);

export default App;
