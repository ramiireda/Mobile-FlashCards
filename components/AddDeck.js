import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { saveDeckTitle } from '../utils/helpers';
import { addDeck } from '../actions';
import { connect } from 'react-redux';

class AddDeck extends Component {
    static navigationOptions = {
        tabBarLabel: 'Add Deck',
    };

    state = {
        title: '',
        error: false
    }

    onTextChange = (text) => {
        if(text) {
            this.setState(() => (
                {
                    title: text,
                    error: false
                }
            ));            
        } else {
            this.setState(() => (
                {
                    title: text,
                    error: true
                }
            ));
        }
        
    }

    submit = () => {
        const { title } = this.state;
        const { navigate } = this.props.navigation;
        if (!title) {
            this.setState(() => ({error: true}));
            return;
        } 
        this.props.dispatch(addDeck(title));
        Keyboard.dismiss();
        // Wait for api/localstorage to update before redirect
        setTimeout(() => { navigate('DeckDetail', {deckId: title}) }, 500);
    }
    
    render() {
        const { title, error } = this.state;
        return (
            <View>
                <FormLabel>New Deck Title</FormLabel>
                <FormInput onChangeText={this.onTextChange} value={title}/>
                <FormValidationMessage >{error ? 'Required Field' : ''}</FormValidationMessage>
                <Button title="Submit" disabled={!title} onPress={this.submit} />
            </View>
        );
    }
}

export default connect()(AddDeck);