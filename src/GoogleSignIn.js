import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';
import { setGoogleCredentials } from './actions/index';
import Config from './config';

class GoogleSignInBase extends React.Component {
    state = {
        popupVisible: false
    };

    componentDidMount() {
        const { socket } = this.props;
        socket.on('google', (data) => {
            this.popup.close();
            this.props.setGoogleCredentials(data);
        });
    }

    handleGoogleButtonClick() {
        if (!this.state.popupVisible) {
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({ popupVisible: true });
        }
    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                this.setState({ popupVisible: false });
            }
        }, 1000);
    }

    openPopup() {
        const { socket } = this.props;
        const width = 600;
        const height = 600;
        const popupLeft = (window.innerWidth / 2) - (width / 2);
        const popupTop = (window.innerHeight / 2) - (height / 2);
        const url = `${Config.API_URL}/auth/google?socketId=${socket.id}`;

        return window.open(
            url,
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,
            scrollbars=no, resizable=no, copyhistory=no, width=${width},
            height=${height}, top=${popupTop}, left=${popupLeft}`
        );
    }

    render() {
        if (this.state.popupVisible) {
            return (
                <div>Awaiting login</div>
            );
        }

        return (
            <GoogleButton onClick={this.handleGoogleButtonClick.bind(this)} />
        );
    }
}

GoogleSignInBase.propTypes = {
    socket: PropTypes.objectOf(
        PropTypes.shape({
            io: PropTypes.any.isRequired
        })
    ).isRequired,
    setGoogleCredentials: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        socket: state.login.socket
    };
}

const GoogleSignIn = connect(
    mapStateToProps,
    { setGoogleCredentials }
)(GoogleSignInBase);

export default GoogleSignIn;
