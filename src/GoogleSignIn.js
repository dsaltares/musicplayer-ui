import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';
import Config from './config';

export default class GoogleSignIn extends React.Component {
    state = {
        popupVisible: false
    };

    componentWillMount() {
        const data = localStorage.getItem('userData');
        if (data) {
            this.props.onSignIn(JSON.parse(data));
        }
    }

    componentDidMount() {
        const { socket, onSignIn } = this.props;
        socket.on('google', (data) => {
            this.popup.close();
            localStorage.setItem('userData', JSON.stringify(data));
            onSignIn(data);
        });
    }

    componentWillUnmount() {
        if (this.intervalHandle) {
            clearInterval(this.intervalHandle);
        }
        const { socket } = this.props;
        socket.off('gooogle');
    }

    handleGoogleButtonClick = () => {
        if (!this.state.popupVisible) {
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({ popupVisible: true });
        }
    }

    checkPopup() {
        this.intervalHandle = setInterval(() => {
            const { popup } = this;
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(this.intervalHandle);
                this.intervalHandle = null;
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
            <GoogleButton onClick={this.handleGoogleButtonClick} />
        );
    }
}

GoogleSignIn.propTypes = {
    socket: PropTypes.objectOf(
        PropTypes.shape({})
    ).isRequired,
    onSignIn: PropTypes.func.isRequired
};
