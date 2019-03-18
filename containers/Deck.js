import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';

class Deck extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam( 'deckTitle', 'Single Deck' ),
		};
	};

	render () {
		const { deckID, deck } = this.props;
		if (isEmpty(deck)) {
			return false;
		}
		return (
			<Container style={ styles.container }>
				<Content>
					<Text style={{ fontSize: 36, textAlign: 'center' }}>{ deck.title }</Text>
					<Text note style={{ fontSize: 28, textAlign: 'center' }}>
						{ deck.questions.length === 1
							? `${ deck.questions.length } card`
							: `${ deck.questions.length } cards`
						}
					</Text>
					<Button
						full
						style={{ marginTop: 60, marginBottom: 20 }}
						onPress={() => {
							this.props.navigation.navigate('AddQuestion', { deckID: deckID, deckTitle: deck.title });
						}}
					>
						<Text>Add Card</Text>
					</Button>
					{ deck.questions.length > 0 &&
						<Button
							full
							dark
							onPress={ () => this.props.navigation.navigate( 'Quiz', { deckID: deckID, deckTitle: deck.title } ) }
						>
							<Text>Start A Quiz</Text>
						</Button>
					}
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		padding: 20,
		paddingTop: 40
	},
} );

function mapStateToProps ({ decks }, { navigation }) {
	const deckID = navigation.getParam( 'deckID', 'NO-ID' );
	return {
		deckID,
		deck: decks[deckID]
	};
}

export default connect( mapStateToProps )( Deck );