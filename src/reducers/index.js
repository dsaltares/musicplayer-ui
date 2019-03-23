import { combineReducers } from 'redux';
import tracksReducer from './tracks';
import loginReducer from './login';
import helpReducer from './help';

const rootReducer = combineReducers({
    tracks: tracksReducer,
    login: loginReducer,
    help: helpReducer
});

export default rootReducer;
