import React, { Component } from 'react';
import { Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

class Deck extends Component {
    render() {
        const { deck, onPress } = this.props;
        const { width } = Dimensions.get('window');
        return (
            <TouchableOpacity style={[styles.deckContainer, {width: width}]} onPress={onPress} >
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.subTitle}>{deck.questions.length} card(s)</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deckContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    subTitle: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});

export default Deck;