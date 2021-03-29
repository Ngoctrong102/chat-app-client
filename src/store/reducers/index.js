import { combineReducers } from 'redux';

import navState from './nav';
import messageState from './message';
import userState from './user';

export default combineReducers({
    navState,
    messageState,
    userState
})