import React, { Component } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Deck from './Deck';
import { connect } from 'react-redux';
import { retrieveDecks, clearAllData } from '../actions';
import get from 'lodash.get';
import componentStyles from '../style/components';

class DeckList extends Component {
    static navigationOptions = {
        tabBarLabel: 'Deck List',
    };

    componentDidMount() {
        this.props.dispatch(retrieveDecks());
    }

    componentWillReceiveProps(newProps) {
        if(get(newProps, 'navigation.state.params.shouldRefresh')) {
            this.props.dispatch(retrieveDecks());
        }
    }

    clearDecks = () => {
        this.props.dispatch(clearAllData())
        setTimeout(() => { this.props.dispatch(retrieveDecks()) }, 500);
    }

    render() {
        const { decks, loadingStatus } = this.props;
        const { navigate } = this.props.navigation;
        
        if (loadingStatus.isFetching) {
            return ( 
                <ActivityIndicator 
                    animating={true}
                    style={componentStyles.loader}
                    size="large"
                />
            )
        }

        return (
            <View>
                {__DEV__ && <TouchableOpacity onPress={this.clearDecks}>
                    <Text style={styles.eraseText} >Erase ALL DECKS!</Text>
                </TouchableOpacity>}
                <FlatList
                    style={{'marginBottom': 20}}
                    data={Object.keys(decks)}
                    keyExtractor={(data,index) => index}
                    renderItem={(data) => 
                        <Deck 
                            deck={decks[data.item]} 
                            onPress={() => navigate('DeckDetail', { deckId: data.item })} 
                        />
                    }
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    eraseText: {
        fontSize: 15,
        color: 'red'
    }
  });

mapStateToProps = (state) => ({
    decks: state.decks,
    loadingStatus: state.loadingStatus
});

export default connect(mapStateToProps)(DeckList);