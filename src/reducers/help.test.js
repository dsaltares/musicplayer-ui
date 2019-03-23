import helpReducer from './help';
import { TOGGLE_HELP_DIALOG } from '../constants/action-types';

it('returns the default state', () => {
    const newState = helpReducer(undefined, {});
    expect(newState).toEqual({
        dialogVisible: false
    });
});

it('TOGGLE_HELP_DIALOG turns dialog visibility from off to on', () => {
    const state = { dialogVisible: false };
    const action = { type: TOGGLE_HELP_DIALOG, payload: null };
    const newState = helpReducer(state, action);

    expect(newState).toEqual({
        dialogVisible: true
    });
});

it('TOGGLE_HELP_DIALOG turns dialog visibility from on to off', () => {
    const state = { dialogVisible: true };
    const action = { type: TOGGLE_HELP_DIALOG, payload: null };
    const newState = helpReducer(state, action);

    expect(newState).toEqual({
        dialogVisible: false
    });
});
