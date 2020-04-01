import { combineReducers } from 'redux';
import decks from './decks';
import deckDetails from './deckDetails';
import loadingStatus from './loadingStatus';
import { CLEAR_ALL } from '../utils/constants';

const appReducer = combineReducers({
    decks,
    deckDetails,
    loadingStatus
});

const rootReducer = (state, action) => {
    if(action.type === CLEAR_ALL) {
        state = undefined;
    }

    return appReducer(state, action);
}

export default rootReducer;

