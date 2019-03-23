import axios from 'axios';
import {
    SET_GOOGLE_CREDENTIALS,
    START_LOADING,
    TRACKS_LOADED,
    FAILED_TO_LOAD,
    SELECT_TRACK,
    NEXT_TRACK,
    PREVIOUS_TRACK,
    TOGGLE_HELP_DIALOG
} from '../constants/action-types';

export function getTracks(accessToken) {
    return function getTracksImpl(dispatch) {
        dispatch({
            type: START_LOADING,
            payload: null
        });

        return axios.get('http://localhost:8080/api/tracks', {
            params: {
                google_token: accessToken
            }
        }).then((response) => {
            dispatch({
                type: TRACKS_LOADED,
                payload: response.data.tracks
            });
        }).catch((err) => {
            dispatch({
                type: FAILED_TO_LOAD,
                payload: err.msg
            });
        });
    };
}

export function setGoogleCredentials(payload) {
    return { type: SET_GOOGLE_CREDENTIALS, payload };
}

export function selectTrack(payload) {
    return { type: SELECT_TRACK, payload };
}

export function nextTrack() {
    return { type: NEXT_TRACK, payload: null };
}

export function previousTrack() {
    return { type: PREVIOUS_TRACK, payload: null };
}

export function toggleHelpDialog() {
    return { type: TOGGLE_HELP_DIALOG, payload: null };
}
