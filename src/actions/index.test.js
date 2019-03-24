import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { getTracks } from './index';
import {
    START_LOADING,
    TRACKS_LOADED,
    FAILED_TO_LOAD
} from '../constants/action-types';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
    jest.restoreAllMocks();
});

it('getTracks creates TRACKS_LOADED when tracks are fetched', () => {
    const tracks = [{ id: 'track_1' }, { id: 'track_2' }];
    axios.get.mockResolvedValue({
        data: { tracks }
    });

    const expectedActions = [
        { type: START_LOADING, payload: null },
        { type: TRACKS_LOADED, payload: tracks }
    ];
    const store = mockStore({});
    return store.dispatch(getTracks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

it('getTracks creates FAILED_TO_LOAD when failing to fetch tracks', () => {
    const error = 'failed to fetch tracks';
    axios.get.mockRejectedValue(new Error(error));

    const expectedActions = [
        { type: START_LOADING, payload: null },
        { type: FAILED_TO_LOAD, payload: error }
    ];
    const store = mockStore({});
    return store.dispatch(getTracks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});
