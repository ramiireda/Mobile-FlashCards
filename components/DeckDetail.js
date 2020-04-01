import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { retrieveDeckDetail } from '../actions';
import get from 'lodash.get';
import { connect } from 'react-redux';
import componentStyles from '../style/components';

class DeckDetail extends Component {
    componentDidMount(){
        const deckId = get(this.props, 'navigation.state.params.deckId');
        this.props.dispatch(retrieveDeckDetail(deckId));
    }

    render() {
        const { deckDetails: deck } = this.props
        const { state, navigate } = this.props.navigation;
        const numOfQuestions = deck.questions ? deck.questions.length : 0;
        const { isFetching } = this.props.loadingStatus;
        
        if (isFetching) {
            return ( 
                <ActivityIndicator 
                    animating={true}
                    style={componentStyles.loader}
                    size="large"
                />
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <MaterialCommunityIcons name="cards-outline" size={100} />
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{numOfQuestions} card(s)</Text>
                </View>
                <TouchableOpacity style={[styles.button, styles.addButton]}>
                    <Text style={styles.addText} onPress={() => navigate('AddCard', {deckTitle: deck.title})}>Add Card</Text>
                </TouchableOpacity>
                {numOfQuestions > 0 && <TouchableOpacity style={[styles.button, styles.startButton]}>
                    <Text style={styles.startText} onPress={() => navigate('Quiz', {deck})}>Start Quiz</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    deckContainer: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 20,
    },
    title: {
        fontSize: 45
    },
    subtitle: {
        fontSize: 25
    },
    button: {
        borderRadius: 10,
        padding: 30,
        margin: 20,
        padding: 20
    },
    addButton: {
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
    },
    addText: {
        fontSize: 20,
        color: 'black',        
    },
    startButton: {
        backgroundColor: 'black',
    },
    startText: {
        fontSize: 20,
        color: 'white',        
    }
});

mapStateToProps = (state) => ({
    deckDetails: state.deckDetails,
    loadingStatus: state.loadingStatus
});

export default connect(mapStateToProps)(DeckDetail);