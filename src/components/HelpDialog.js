import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';

import { toggleHelpDialog } from '../actions/index';

export function HelpDialogBase(props) {
    const { isOpen } = props;

    return (
        <Dialog
            onClose={props.toggleHelpDialog}
            aria-labelledby="simple-dialog-title"
            open={isOpen}
        >
            <DialogTitle id="simple-dialog-title">
                How this music player works
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Log in with your Google account and listen to the tracks in your
                    Google Drive <code>musicplayer</code> folder. Traks should be
                    named <code>Artist - Title.mp3</code>.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

HelpDialogBase.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleHelpDialog: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isOpen: state.help.dialogVisible
    };
}

const HelpDialog = connect(
    mapStateToProps,
    { toggleHelpDialog }
)(HelpDialogBase);

export default HelpDialog;
