import {
    START_LOADING,
    TRACKS_LOADED,
    SELECT_TRACK,
    NEXT_TRACK,
    PREVIOUS_TRACK
} from '../constants/action-types';
import PlayerStates from '../constants/playerstates';

const initialState = {
    list: [],
    trackIndex: -1,
    state: PlayerStates.EMPTY
};

function tracksReducer(state = initialState, action) {
    if (action.type === START_LOADING) {
        return {
            ...state,
            list: [],
            trackIndex: -1,
            state: PlayerStates.LOADING
        };
    }
    if (action.type === TRACKS_LOADED) {
        const trackIndex = action.payload.length > 0 ? 0 : -1;
        return {
            ...state,
            list: action.payload,
            state: PlayerStates.LOADED,
            trackIndex
        };
    }
    if (action.type === SELECT_TRACK) {
        const trackIndex = state.list.findIndex(
            track => track.id === action.payload
        );
        return {
            ...state,
            trackIndex
        };
    }
    if (action.type === NEXT_TRACK) {
        const numTracks = state.list.length;
        const trackIndex = numTracks > 0 ?
            (state.trackIndex + 1) % numTracks : -1;
        return {
            ...state,
            trackIndex
        };
    }
    if (action.type === PREVIOUS_TRACK) {
        const numTracks = state.list.length;
        const trackIndex = state.trackIndex - 1;
        const boundedTrackIndex = trackIndex >= 0 ?
            trackIndex : numTracks - 1;

        return {
            ...state,
            trackIndex: boundedTrackIndex
        };
    }

    return state;
}

export default tracksReducer;
