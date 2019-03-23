import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Header from './Header';
import AppContent from './AppContent';
import TrackPlayer from './TrackPlayer';

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: grey[800]
        },
        secondary: {
            main: grey[50]
        }
    },
    typography: { useNextVariants: true }
});

const styles = () => ({
    appContent: {
        marginTop: '80px',
        marginBottom: '100px'
    }
});

function AppBase(props) {
    const { classes } = props;

    return (
        <MuiThemeProvider theme={appTheme}>
            <Header />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.appContent}
            >
                <Grid item>
                    <AppContent />
                </Grid>
            </Grid>
            <TrackPlayer />
        </MuiThemeProvider>
    );
}

AppBase.propTypes = {
    classes: PropTypes.shape({}).isRequired
};

const ConnectedApp = connect(
    null,
    null
)(AppBase);

const App = withStyles(styles)(ConnectedApp);

export default (App);
