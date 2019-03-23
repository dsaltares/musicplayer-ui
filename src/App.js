import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import AppContent from './AppContent';
import TrackPlayer from './TrackPlayer';

const appTheme = createMuiTheme({
    palette: {
        secondary: {
            main: grey[50]
        }
    },
    typography: { useNextVariants: true }
});

const styles = theme => ({
    appBar: {
        height: '100px',
        margin: 'auto',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`
    },
    appContent: {
        marginTop: '110px',
        marginBottom: '100px'
    }
});

function AppBase(props) {
    const { classes } = props;

    return (
        <MuiThemeProvider theme={appTheme}>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Typography variant="h3" color="secondary">
                    Music Player
                </Typography>
            </AppBar>
            <Grid
                container
                direction="column"
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

const ConnectedApp = connect(
    null,
    null
)(AppBase);

const App = withStyles(styles)(ConnectedApp);

export default (App);
