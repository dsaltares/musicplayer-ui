import io from 'socket.io-client';
import { SET_GOOGLE_CREDENTIALS } from '../constants/action-types';
import Endpoints from '../constants/endpoints';

const initialState = {
    credentials: null,
    socket: io(Endpoints.MUSIC_PLAYER)
};

function loginReducer(state = initialState, action) {
    if (action.type === SET_GOOGLE_CREDENTIALS) {
        return {
            ...state,
            credentials: action.payload
        };
    }

    return state;
}

export default loginReducer;
