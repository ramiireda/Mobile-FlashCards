import { ADD_DECK, RECEIVE_DECKS } from '../utils/constants';

function decks (state = {}, action) {
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        default:
            return state;
    }
}

export default decks;