import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

class DeckView extends Component {

	static navigationOptions = {
		headerTitle: 'My Decks'
	};

	_keyExtractor = (item) => item;

	render () {
		const { decks } = this.props;
		return (
			<View style={styles.container}>
				{
					(isEmpty(decks)) ? (
						<Text style={styles.emptyPage}>You do not have any decks yet...</Text>
					) : (
						<FlatList
							style={styles.list}
							data={Object.keys(decks)}
							keyExtractor={this._keyExtractor}
							contentContainerStyle={{ padding: 30 }}
							ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
							renderItem={({ item }) => {
								const deck = decks[item];
								return (
									<TouchableOpacity
										key={item}
										style={styles.button}
										onPress={() => {
											this.props.navigation.navigate('Deck', { deckID: item, deckTitle: deck.title });
										}}
									>
										<Text style={styles.deckTitle}>{deck.title}</Text>
										<Text style={styles.deckCount}>
											{ deck.questions.length === 1
												? `${ deck.questions.length } question`
												: `${ deck.questions.length } questions`
											}
										</Text>
									</TouchableOpacity>
								);
							}}
						/>
					)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		flex: 1
	},
	emptyPage: {
		padding: 40,
		paddingTop: 80,
		textAlign: 'center',
		fontSize: 24
	},
	list: {
		flex: 1
	},
	button: {
		backgroundColor: 'lightsteelblue',
		borderRadius: 7,
		padding: 40,
	},
	deckTitle: {
		color: 'teal',
		fontSize: 25,
		textAlign: 'center'
	},
	deckCount: {
		marginTop: 10,
		color: 'teal',
		fontSize: 18,
		textAlign: 'center'
	}
} );

function mapStateToProps ({ decks }) {
	return {
		decks: decks
	};
}

export default connect(mapStateToProps)(DeckView);
