import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GoogleSignIn from './GoogleSignIn';

class AppBase extends React.Component {
    render() {
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
                    <GoogleSignIn />
                </Grid>
            </div>
        );
    }
}

const App = connect(
    null,
    null
)(AppBase);

export default App;
