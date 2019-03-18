import { addCardToDeck, getDecks, saveDeckTitle } from '../../utils/_DATA';

export const RECEIVE_DECKS = 'DECKS/RECEIVE';

export function receiveDecks (payload) {
	return {
		type: RECEIVE_DECKS,
		payload
	};
}

export function saveDeck (title) {
	return function(dispatch) {
		return saveDeckTitle(title)
			.then((res) => {
				console.log('Deck action result: ', res);
				dispatch(receiveDecks(res))
			});
	};
}

export function saveQuestionToDeck (title, card) {
	return function(dispatch) {
		return addCardToDeck(title, card)
			.then((res) => {
				console.log('Question action result: ', res);
				dispatch(receiveDecks(res))
			});
	};
}