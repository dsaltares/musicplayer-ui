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
import Endpoints from '../constants/endpoints';

export function getTracks(accessToken) {
    return (dispatch) => {
        dispatch(startLoadingTracks());

        return sendTracksRequest(accessToken)
            .then(response => dispatch(tracksLoaded(response.data.tracks)))
            .catch(error => dispatch(failedToLoadTracks(error.msg)));
    };
}

function startLoadingTracks() {
    return { type: START_LOADING, payload: null };
}

function sendTracksRequest(accessToken) {
    return axios.get(`${Endpoints.MUSIC_PLAYER}/api/tracks`, {
        params: {
            google_token: accessToken
        }
    });
}

function tracksLoaded(tracks) {
    return { type: TRACKS_LOADED, payload: tracks };
}

function failedToLoadTracks(error) {
    return { type: FAILED_TO_LOAD, payload: error };
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
