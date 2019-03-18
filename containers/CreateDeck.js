import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Form, Input, Item, Label, Text } from 'native-base';
import { connect } from 'react-redux';
import { saveDeck } from '../redux/actions/decks';

class CreateDeck extends Component {

	static navigationOptions = {
		headerTitle: 'Create New Deck'
	};

	state = {
		deckTitle: ''
	};

	addDeck = () => {
		const { deckTitle } = this.state;
		this.props.dispatch( saveDeck( deckTitle ) );
		const key = deckTitle.trim().replace( /\s+/g, '' );
		console.log(111);
		this.props.navigation.navigate( 'Deck', { deckID: key, deckTitle: deckTitle } );
	};

	render () {
		return (
			<Container style={ styles.container }>
				<Content>
					<Form>
						<Item floatingLabel last>
							<Label>Deck Title</Label>
							<Input
								onChangeText={ (text) => this.setState( () => ({ deckTitle: text }) ) }
								value={ this.state.deckTitle }
							/>
						</Item>
						<Button
							full
							style={ { marginTop: 30 } }
							onPress={ this.addDeck }
						>
							<Text>Add Deck</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		padding: 20
	},
} );

export default connect()( CreateDeck );