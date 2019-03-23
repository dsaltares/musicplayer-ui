import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import t from 'typy';

import HelpDialog from './HelpDialog';
import { toggleHelpDialog } from './actions/index';

const styles = () => ({
    grow: {
        flexGrow: 1
    },
    profile: {
        width: '50px',
        height: '50px'
    },
    barItem: {
        padding: '5px'
    }
});

function HeaderBase(props) {
    const {
        classes,
        profilePhoto,
        userName
    } = props;

    const avatar = profilePhoto ?
        (
            <Tooltip title={`Hello, ${userName}!`}>
                <Avatar
                    src={profilePhoto}
                    alt={userName}
                    className={classes.profile}
                />
            </Tooltip>
        ) :
        (<div />);

    return (
        <AppBar position="fixed">
            <ToolBar>
                <Typography variant="h4" color="secondary">
                    Music Player
                </Typography>
                <div className={classes.grow} />
                { avatar }
                <IconButton
                    className={classes.barItem}
                    onClick={props.toggleHelpDialog}
                >
                    <HelpIcon color="secondary" fontSize="large" />
                </IconButton>
                <HelpDialog />
            </ToolBar>
        </AppBar>
    );
}

HeaderBase.propTypes = {
    profilePhoto: PropTypes.string,
    userName: PropTypes.string,
    toggleHelpDialog: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.shape({
        menuButton: PropTypes.objectOf(PropTypes.shape({}))
    })).isRequired
};

HeaderBase.defaultProps = {
    profilePhoto: '',
    userName: ''
};

function mapStateToProps(state) {
    return {
        profilePhoto: t(state, 'login.credentials.profile.picture').safeObject,
        userName: t(state, 'login.credentials.profile.name.givenName').safeObject
    };
}

const ConnectedHeader = connect(
    mapStateToProps,
    { toggleHelpDialog }
)(HeaderBase);

const Header = withStyles(styles)(ConnectedHeader);

export default Header;
