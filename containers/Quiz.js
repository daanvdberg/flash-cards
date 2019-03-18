import React, { Component, Fragment } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, View, Text, Card, CardItem, Body } from 'native-base';
import CardFlip from 'react-native-card-flip';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {

	static navigationOptions = ({ navigation }) => {
		const title = navigation.getParam( 'deckTitle', '' );
		return {
			title: title ? 'Quiz - ' + title : 'Quiz',
		};
	};

	state = {
		currentQuestion: 0,
		correctAnswers: 0,
		showResult: false
	};

	answerQuestion = (isCorrect) => () => {
		// update "correctAnswers" counter
		if (isCorrect === true) {
			this.setState( (state) => ({ correctAnswers: state.correctAnswers + 1 }) );
		}

		// go to next question
		if (this.state.currentQuestion === (this.props.deck.questions.length - 1)) {
			clearLocalNotification()
				.then(setLocalNotification);
			this.setState( () => ({ showResult: true }) );
		} else {
			this.setState( (state) => ({ currentQuestion: state.currentQuestion + 1 }) );
		}
	};

	restartQuiz = () => {
		// restart
		this.setState( () => ({
			currentQuestion: 0,
			correctAnswers: 0,
			showResult: false
		}) );
	};

	render () {
		const { currentQuestion, correctAnswers, showResult } = this.state;
		const { deck } = this.props;
		return (
			<Container style={ styles.container }>
				{ (showResult === true) ? (
					<View>
						<Text style={ { fontSize: 24, marginBottom: 10, textAlign: 'center' } }>Results</Text>
						<Text style={ { fontSize: 18, textAlign: 'center' } }>
							You have <Text
							style={ { fontWeight: '600' } }>{ correctAnswers }</Text> correct { correctAnswers === 1 ? 'answer' : 'answers' },
						</Text>
						<Text style={ { fontSize: 18, textAlign: 'center' } }>
							for a score of:
						</Text>
						<View style={ styles.score }>
							<Text style={ { color: 'white', fontSize: 24, fontWeight: '600' } }>
								{ ((correctAnswers / deck.questions.length) * 100).toFixed( 2 ) }%
							</Text>
						</View>
					</View>
				) : (
					<Fragment>
						<Text style={ { fontSize: 14, marginBottom: 10, color: 'hsl(0, 0%, 70%)' } }>
							Tap card to show answer <Icon name='gesture-tap' size={ 25 } color='hsl(0, 0%, 70%)' />
						</Text>
						<CardFlip style={ styles.cardContainer } ref={ (card) => this.card = card }>
							<TouchableOpacity style={ styles.card } activeOpacity={ 1 }
							                  onPress={ () => this.card.flip() }>
								<Text style={ styles.cardText }>
									{ deck.questions[currentQuestion].question }
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={ [styles.card, styles.answer] } activeOpacity={ 1 }
							                  onPress={ () => this.card.flip() }>
								<Text style={ [styles.cardText, styles.answerText] }>
									{ deck.questions[currentQuestion].answer }
								</Text>
							</TouchableOpacity>
						</CardFlip>
						<Text style={ { fontSize: 16, marginTop: 30 } }>
							{currentQuestion} out of {deck.questions.length} questions answered.
						</Text>
					</Fragment>
				) }

				{ (showResult === true) ? (
					<View style={ styles.buttonGroup }>
						<Button
							primary
							full
							style={ { marginTop: 40 } }
							onPress={ this.restartQuiz }
						>
							<Text>Restart Quiz</Text>
						</Button>
						<Button
							dark
							full
							style={ { marginTop: 20 } }
							onPress={ () => this.props.navigation.navigate( 'DeckView' ) }
						>
							<Text>Back to Decks</Text>
						</Button>
					</View>
				) : (
					<View style={ styles.buttonGroup }>
						<Button
							success
							full
							style={ { marginTop: 20 } }
							onPress={ this.answerQuestion( true ) }
						>
							<Text>Correct</Text>
						</Button>
						<Button
							danger
							full
							style={ { marginTop: 20 } }
							onPress={ this.answerQuestion( false ) }
						>
							<Text>Incorrect</Text>
						</Button>
					</View>
				) }
			</Container>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		padding: 40,
		backgroundColor: '#f2f2f2',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	cardContainer: {
		width: '100%',
		height: 200,
		padding: 20
	},
	card: {
		padding: 20,
		height: 200,
		backgroundColor: 'white',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
	},
	answer: {
		backgroundColor: 'hsl(0, 0%, 30%)'
	},
	answerText: {
		color: 'white'
	},
	cardText: {
		fontSize: 24,
		fontWeight: '500',
		textAlign: 'center'
	},
	score: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		width: 100,
		height: 100,
		backgroundColor: 'hsl(0, 0%, 60%)',
		borderRadius: 100,
		alignSelf: 'center'
	},
	buttonGroup: {
		width: '100%',
		marginTop: 20
	}
} );

function mapStateToProps ({ decks }, { navigation }) {
	const deckID = navigation.getParam( 'deckID', 'NO-ID' );
	return {
		deck: decks[deckID]
	};
}

export default connect( mapStateToProps )( Quiz );