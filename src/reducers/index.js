import io from 'socket.io-client';
import Config from '../config';
import {
    ADD_TRACKS,
    TRACKS_LOADED,
    SET_GOOGLE_CREDENTIALS
} from '../constants/action-types';

const initialState = {
    tracks: [],
    player: {
        trackIndex: -1
    },
    error: null,
    loaded: false,
    login: {
        credentials: null,
        socket: io(Config.API_URL)
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_TRACKS) {
        return {
            ...state,
            tracks: [ ...state.tracks, ...action.payload ]
        };
    }
    if (action.type === TRACKS_LOADED) {
        return {
            ...state,
            tracks: action.payload
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

    return state;
}

export default rootReducer;
