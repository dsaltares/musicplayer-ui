import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTracks } from './actions/index';

class TrackListBase extends React.Component {
    componentDidMount() {
        this.props.getTracks();
    }

    render() {
        const { tracks } = this.props;
        return (
            <ul>
                {
                    tracks.map(track => <li key={track.id}>{track.name}</li>)
                }
            </ul>
        );
    }
}

TrackListBase.propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired
};

// const ConnectedTrackList = ({ tracks }) => (
//     <ul>
//         {
//             tracks.map(track => <li key={track.id}>{track.title}</li>)
//         }
//     </ul>
// );

// ConnectedTrackList.propTypes = {
//     tracks: PropTypes.arrayOf(PropTypes.object).isRequired
// };

const mapStateToProps = state => ({
    tracks: state.tracks
});

const TrackList = connect(
    mapStateToProps,
    { getTracks }
)(TrackListBase);

export default TrackList;
