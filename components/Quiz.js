import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { CORRECT, INCORRECT } from '../utils/constants'; 
import { resetLocalNotification } from '../utils/helpers';
import * as colors from '../style/colors';

class Quiz extends PureComponent {
    state = {
        showAnswer: false,
        currentCardIdx: 0,
        corrects: 0,
        incorrects: 0
    };

    onShowPress = () => {
        this.setState(state => ({ showAnswer: !state.showAnswer}));
    }

    onNextPress = (answer) => {
        if(answer === CORRECT) {
            this.setState((state) => ({
                showAnswer: false,
                currentCardIdx: state.currentCardIdx + 1,
                corrects: state.corrects + 1
            }));
        } else if (answer === INCORRECT) {
            this.setState((state) => ({ 
                showAnswer: false,
                currentCardIdx: state.currentCardIdx + 1,
                incorrects: state.incorrects + 1
            }));
        }
    }

    render() {
        const flipTo = {
            answer: "Answer",
            question: "Question"
        };
        const { showAnswer, currentCardIdx, corrects, incorrects } = this.state;
        const { deck } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        const currentCard = deck.questions[currentCardIdx];
        const numberOfQuestions = deck.questions.length;
        const { width } = Dimensions.get('window');

        if(numberOfQuestions === 0) {
            return (
                <View style={styles.container}>
                    <Text>No cards in this deck</Text>
                </View>
            );
        }

        if(currentCardIdx === numberOfQuestions) {
            resetLocalNotification();
                
            const percentage = Math.round((corrects/numberOfQuestions) * 100);
            return (
                <View>
                    <Image
                        style={{ width }}
                        source={percentage > 50 ? require('../images/yay.gif') : require('../images/keep-swimming.gif')}
                    />
                    <Text style={styles.resultsText}>{`You got ${percentage}% correct!`}</Text>
                    <TouchableOpacity style={[styles.goBackButtons, {backgroundColor: colors.GO_BACK_BTN}]} onPress={() => navigate('Quiz', { deck })}>
                        <Text style={styles.goBackText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.goBackButtons, {backgroundColor: colors.GO_BACK_BTN}]} onPress={() => navigate('DeckDetail', {deckId: deck.title})}>
                        <Text style={styles.goBackText}>Return to Deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <Text style={styles.cardNumber}>{`${currentCardIdx + 1}/${numberOfQuestions}`}</Text>
                    {showAnswer ? 
                        <Text style={styles.mainText}>Answer: {currentCard.answer}</Text>
                        :                
                        <Text style={styles.mainText}>{currentCard.question}</Text>
                    }
                </View>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity style={[styles.flipButton, {width: 150, alignSelf: 'center', borderRadius: 10}]} onPress={this.onShowPress}>
                        <Text style={styles.buttonText}>{showAnswer ? flipTo.question : flipTo.answer}</Text>    
                    </TouchableOpacity>
                    <View style={styles.answerButtonsContainer}> 
                        <TouchableOpacity style={styles.correctButton} onPress={() => this.onNextPress(CORRECT)}>
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.incorrectButton} onPress={() => this.onNextPress(INCORRECT)}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    deckContainer: {
        flex: 2,
        borderWidth: 1,
        justifyContent: 'flex-start',
        borderColor: 'black',
        borderRadius: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    answerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cardNumber: {
        fontSize: 20,
        alignSelf: 'flex-start',
        margin: 20
    },
    mainText: {
        fontSize: 45,
        marginTop: 20,
        textAlign: 'center'
    },
    flipButton: {
        backgroundColor: '#d8c931'
    },
    correctButton: {
        backgroundColor: '#1f8346',
        borderRadius: 10,
        margin: 10
    },
    incorrectButton: {
        backgroundColor: '#ae1c1c',
        borderRadius: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 20,
        padding: 20,
        textAlign: 'center'
    },
    resultsText: {
        fontSize: 45,
        textAlign: 'center'
    },
    goBackButtons: {
        borderRadius: 10,
        margin: 10
    },
    goBackText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 20
    }
});

export default Quiz;