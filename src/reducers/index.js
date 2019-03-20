import io from 'socket.io-client';
import Config from '../config';
import {
    TRACKS_LOADED,
    SET_GOOGLE_CREDENTIALS
} from '../constants/action-types';

const initialState = {
    tracks: {
        list: [],
        error: null,
        loading: true
    },
    player: {
        trackIndex: -1
    },
    login: {
        credentials: null,
        socket: io(Config.API_URL)
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === TRACKS_LOADED) {
        return {
            ...state,
            tracks: {
                list: action.payload,
                error: null,
                loaded: true
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

    return state;
}

export default rootReducer;
