import tracksReducer from './tracks';
import {
    START_LOADING,
    TRACKS_LOADED,
    SELECT_TRACK,
    NEXT_TRACK,
    PREVIOUS_TRACK
} from '../constants/action-types';

it('returns the default state', () => {
    const newState = tracksReducer(undefined, {});
    expect(newState).toEqual({
        list: [],
        trackIndex: -1,
        state: 'EMPTY'
    });
});

it('START_LOADING sets state to LOADING', () => {
    const action = { type: START_LOADING };
    const state = {
        list: [ 'some_track' ],
        trackIndex: 0,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: [],
        trackIndex: -1,
        state: 'LOADING'
    });
});

it('TRACKS_LOADED sets state to LOADED and sets the tracks', () => {
    const action = {
        type: TRACKS_LOADED,
        payload: [ 'song_1', 'song_2' ]
    };
    const newState = tracksReducer(undefined, action);
    expect(newState).toEqual({
        list: [ 'song_1', 'song_2' ],
        trackIndex: 0,
        state: 'LOADED'
    });
});

it('TRACKS_LOADED with empty list sets state to LOADED and keeps index at -1', () => {
    const action = {
        type: TRACKS_LOADED,
        payload: []
    };
    const newState = tracksReducer(undefined, action);
    expect(newState).toEqual({
        list: [],
        trackIndex: -1,
        state: 'LOADED'
    });
});

it('SELECT_TRACK sets index when track is found', () => {
    const action = {
        type: SELECT_TRACK,
        payload: 'track_2'
    };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: -1,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: 1,
        state: 'LOADED'
    });
});

it('SELECT_TRACK sets index to -1 when track is not found', () => {
    const action = {
        type: SELECT_TRACK,
        payload: 'track_5'
    };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: 1,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: -1,
        state: 'LOADED'
    });
});

it('NEXT_TRACK goes to the next index', () => {
    const action = { type: NEXT_TRACK };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: 1,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: 2,
        state: 'LOADED'
    });
});

it('NEXT_TRACK wraps index around', () => {
    const action = { type: NEXT_TRACK };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: 2,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: 0,
        state: 'LOADED'
    });
});

it('PREVIOUS_TRACK goes to the previous index', () => {
    const action = { type: PREVIOUS_TRACK };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: 1,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: 0,
        state: 'LOADED'
    });
});

it('PREVIOUS_TRACK wraps index around', () => {
    const action = { type: PREVIOUS_TRACK };
    const trackList = [{ id: 'track_1' }, { id: 'track_2' }, { id: 'track_3' }];
    const state = {
        list: trackList,
        trackIndex: 0,
        state: 'LOADED'
    };
    const newState = tracksReducer(state, action);
    expect(newState).toEqual({
        list: trackList,
        trackIndex: 2,
        state: 'LOADED'
    });
});
