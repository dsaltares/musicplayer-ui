import { TOGGLE_HELP_DIALOG } from '../constants/action-types';

const initialState = {
    dialogVisible: false
};

function helpReducer(state = initialState, action) {
    if (action.type === TOGGLE_HELP_DIALOG) {
        return {
            ...state,
            dialogVisible: !state.dialogVisible
        };
    }

    return state;
}

export default helpReducer;
