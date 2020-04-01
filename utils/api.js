import { AsyncStorage } from 'react-native';
import { ALL_DECKS, NOTIFICATION_KEY } from './constants';

export function fetchAllDecks() {
    return AsyncStorage.getItem(ALL_DECKS).then(JSON.parse).then((result) => result);
}

export function addDeck(deckTitle) {
    return AsyncStorage.getItem(ALL_DECKS).then(JSON.parse).then((result) => {
        result[deckTitle] = {
            title: deckTitle,
            questions: []
        };

        AsyncStorage.setItem(ALL_DECKS, JSON.stringify(result));
        return result[deckTitle];
    });
}

export function setData(data) {
    AsyncStorage.setItem(ALL_DECKS, JSON.stringify(data));    
}

export function addCard(deckTitle, card) {
    return AsyncStorage.getItem(ALL_DECKS).then(JSON.parse).then((result) => {
        result[deckTitle].questions.push(card);

        AsyncStorage.setItem(ALL_DECKS, JSON.stringify(result));
        return result[deckTitle];
    });
}

export function getDeck(id) {
    return AsyncStorage.getItem(ALL_DECKS).then(JSON.parse).then((result) => {
        return result[id];
    });
}

export function flush() {
    return AsyncStorage.removeItem(ALL_DECKS).then(() => AsyncStorage.removeItem(NOTIFICATION_KEY));
}