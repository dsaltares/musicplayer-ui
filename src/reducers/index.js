import io from 'socket.io-client';
import {
    SET_GOOGLE_CREDENTIALS,
    START_LOADING,
    TRACKS_LOADED,
    SELECT_TRACK,
    NEXT_TRACK,
    PREVIOUS_TRACK,
    TOGGLE_HELP_DIALOG
} from '../constants/action-types';
import PlayerStates from '../constants/playerstates';
import Endpoints from '../constants/endpoints';

const initialState = {
    tracks: {
        list: [],
        trackIndex: -1,
        state: PlayerStates.EMPTY
    },
    login: {
        credentials: null,
        socket: io(Endpoints.MUSIC_PLAYER)
    },
    helpDialogVisible: false
};

function rootReducer(state = initialState, action) {
    if (action.type === TRACKS_LOADED) {
        const trackIndex = action.payload.length > 0 ? 0 : -1;
        return {
            ...state,
            tracks: {
                list: action.payload,
                state: PlayerStates.LOADED,
                trackIndex
            }
        };
    }
    if (action.type === SET_GOOGLE_CREDENTIALS) {
        const login = {
            ...state.login,
            credentials: action.payload
        };
        return {
            ...state,
            login
        };
    }
    if (action.type === START_LOADING) {
        return {
            ...state,
            tracks: {
                ...state.tracks,
                list: [],
                state: PlayerStates.LOADING
            }
        };
    }
    if (action.type === SELECT_TRACK) {
        const trackIndex = state.tracks.list.findIndex(
            track => track.id === action.payload
        );
        return {
            ...state,
            tracks: {
                ...state.tracks,
                trackIndex
            }
        };
    }
    if (action.type === NEXT_TRACK) {
        const numTracks = state.tracks.list.length;
        const trackIndex = numTracks > 0 ?
            (state.player.trackIndex + 1) % numTracks : -1;
        return {
            ...state,
            tracks: {
                ...state.tracks,
                trackIndex
            }
        };
    }
    if (action.type === PREVIOUS_TRACK) {
        const numTracks = state.tracks.list.length;
        const trackIndex = state.player.trackIndex - 1;
        const boundedTrackIndex = trackIndex >= 0 ?
            trackIndex : numTracks - 1;

        return {
            ...state,
            tracks: {
                ...state.tracks,
                trackIndex: boundedTrackIndex
            }
        };
    }
    if (action.type === TOGGLE_HELP_DIALOG) {
        return {
            ...state,
            helpDialogVisible: !state.helpDialogVisible
        };
    }

    return state;
}

export default rootReducer;
