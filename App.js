import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs'
import  Constants  from 'expo-constants'
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import { setLocalNotification } from './utils/helpers';
import { Entypo } from '@expo/vector-icons';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import GoBack from './components/GoBack';
import { createAppContainer } from 'react-navigation';


const middlewares = [thunk];
if(__DEV__) {
  middlewares.push(createLogger());
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: () => <Entypo name="list" size={30} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: () => <Entypo name="add-to-list" size={30} />
    },
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'blue' : 'white',
    style: {
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'blue',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
  headerMode: 'none',
  
});

const stackNav = createStackNavigator ({
    Home: {
      screen: Tabs
    },
    DeckDetail: {
      screen: DeckDetail
    },
    Quiz: {
      screen: Quiz
    },
    AddCard: {
      screen: AddCard
    }
},{
  initialRouteName: 'Home',
  navigationOptions: ({navigation}) => ({
    headerLeft: <GoBack navigate={navigation.navigate} state={navigation.state} />,
})
});

const MainNav = createAppContainer(stackNav)

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(...middlewares))}>
        <View style={styles.container}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar 
              backgroundColor={'transparent'}
              translucent />
          </View>
          <MainNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default App