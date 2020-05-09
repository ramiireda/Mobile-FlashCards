import { fetchAllDecks, setData, addDeck, addCard, flush, getDeck } from './api';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import { NOTIFICATION_KEY } from './constants';

export function getDummyData() {
  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  setData(data);
  return data;
}

export function getDecks() {
  return fetchAllDecks().then((decks) => {
    if (decks !== null) {
      return decks;
    }

    return getDummyData();
  });
}

export function saveDeckTitle(title) {
  return addDeck(title);
}

export function addCardToDeck(title, card) {
  return addCard(title, card);
}

export function getDeckById(id) {
  return getDeck(id);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        // We have not set up a notification
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();
  
              let tomorrow = new Date();
              
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(7);
              tomorrow.setMinutes(15);

              Notifications.scheduleLocalNotificationAsync(
                {
                  title: "Quiz TIME!!",
                  body: "Get 1% better everyday. It adds up! 🎓 💯",
                  ios: {
                    sound: true
                  },
                  android: {
                    sound: true,
                    priority: 'high',
                    sticky: false,
                    vibrate: true
                  }
                },
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }
        )
      }
    }).catch((err) => console.log(`Error in setting local notification. Error ${err}`));
}

export function resetLocalNotification() {
  clearLocalNotification().then(setLocalNotification);
}

export function clearAllDecks() {
  return flush();
}
