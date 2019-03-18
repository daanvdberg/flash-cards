import { AsyncStorage } from 'react-native';

export async function getDecks () {
	// return all of the decks along with their titles, questions, and answers.
	try {
		const retrievedDecks = await AsyncStorage.getItem( 'DECKS' );
		return JSON.parse( retrievedDecks );
	} catch (error) {
		// Error saving data
		console.log( 'Error getting decks: ', error );
	}
}

export function saveDeckTitle (title) {
	// take in a single title argument and add it to the decks.
	return new Promise( (resolve, reject) => {
		const key = title.trim().replace( /\s+/g, '' );
		const newDeck = {
			title,
			questions: []
		};
		AsyncStorage.mergeItem( 'DECKS', JSON.stringify( { [key]: newDeck } ), () => {
			AsyncStorage.getItem( 'DECKS', (err, result) => {
				if (err) {
					reject( 'Error adding deck: ', err );
				}
				resolve( JSON.parse( result ) );
			} );
		} );
	} );
}

export function addCardToDeck (title, card) {
	// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
	return new Promise( (resolve, reject) => {
		AsyncStorage.getItem( 'DECKS', (err, result) => {
			if (err) {
				reject( 'Error adding question: ', err );
			}
			let decks = JSON.parse( result );
			const key = title.trim().replace( /\s+/g, '' );
			decks = {
				...decks,
				[key]: {
					title: decks[title].title,
					questions: [
						...decks[title].questions,
						{
							question: card.question,
							answer: card.answer
						}
					]
				}
			};
			AsyncStorage.setItem( 'DECKS', JSON.stringify( decks ), () => {
				AsyncStorage.getItem( 'DECKS', (err, result) => {
					if (err) {
						reject( 'Error adding question: ', err );
					}
					resolve( JSON.parse( result ) );
				} );
			} );
		} );
	} );
}
