import { RECEIVE_DECK_DETAIL, ADD_CARD, ADD_DECK } from '../utils/constants';

function deckDetails(state = {}, action) {
    switch(action.type){
        case RECEIVE_DECK_DETAIL:
            return {
                ...state,
                ...action.deck
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck,
                deckId: action.deckTitle
            }
        case ADD_CARD:
            return {
                ...state,
                ...action.deck
            }
        default:
            return state
    }
}

export default deckDetails;