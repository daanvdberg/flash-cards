import { RECEIVE_DECKS } from '../actions/decks';

export default function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.payload
			};

		default:
			return state;
	}
}