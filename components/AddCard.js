import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { addCard } from '../actions';
import { connect } from 'react-redux';

class AddCard extends Component {
    static navigationOptions = {
        tabBarLabel: 'Add Card',
    };

    state = {
        question: '',
        answer: ''
    }

    onTextChange = (type, text) => {
        this.setState(() => ({
            [type]: text
        }));
    }

    submit = () => {      
        const { question, answer } = this.state;
        const { navigate } = this.props.navigation;
        const { deckTitle } = this.props.navigation.state.params;

        this.props.dispatch(addCard(deckTitle, {question, answer}));
        Keyboard.dismiss();
        // Wait for api/localstorage to update before redirect
        setTimeout(() => { navigate('DeckDetail', { deckId: deckTitle }) }, 500);
    }

    render() {
        const { question, answer } = this.state;
        return (
            <View>
                <FormLabel>Question</FormLabel>
                <FormInput onChangeText={(text) => this.onTextChange('question', text)} value={question}/>

                <FormLabel>Answer</FormLabel>
                <FormInput onChangeText={(text) => this.onTextChange('answer',text)} value={answer}/>
                <Button title="Submit" disabled={!(question && answer)} onPress={this.submit} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({state});

export default connect(mapStateToProps)(AddCard);