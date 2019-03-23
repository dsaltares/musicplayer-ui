import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import AppContent from './AppContent';

const styles = theme => ({
    appContainer: {
        maxWidth: 800,
        position: 'relative',
        margin: '0 auto'
    },
    appBar: {
        position: 'relative',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`
    },
    appContent: {
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 6}px`
    }
});

function AppBase(props) {
    const { classes } = props;

    return (
        <div className={classes.appContainer}>
            <CssBaseline />
            <AppBar
                position="static"
                className={classes.appBar}
            >
                <Typography variant="h3" color="inherit">
                    Music Player
                </Typography>
            </AppBar>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={16}
                className={classes.appContent}
            >
                <Grid item>
                    <AppContent />
                </Grid>
            </Grid>
        </div>
    );
}

const ConnectedApp = connect(
    null,
    null
)(AppBase);

const App = withStyles(styles)(ConnectedApp);

export default (App);
