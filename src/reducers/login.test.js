import io from 'socket.io-client';
import loginReducer from './login';
import { SET_GOOGLE_CREDENTIALS } from '../constants/action-types';
import Endpoints from '../constants/endpoints';

beforeEach(() => {
    jest.restoreAllMocks();
});

it('returns the default state', () => {
    const newState = loginReducer(undefined, {});

    expect(newState.credentials).toBe(null);
    expect(newState.socket).toBeDefined();
    expect(io).toHaveBeenCalledWith(Endpoints.MUSIC_PLAYER);
});

it('sets google credentials', () => {
    const action = { type: SET_GOOGLE_CREDENTIALS, payload: 'credentials' };
    const newState = loginReducer(undefined, action);

    expect(newState.credentials).toBe('credentials');
    expect(newState.socket).toBeDefined();
    expect(io).toHaveBeenCalledWith(Endpoints.MUSIC_PLAYER);
});
