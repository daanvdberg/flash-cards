import { createStore } from 'redux';
import rootReducer from './reducers/index';
import middleware from './middleware';

export default function store(initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		middleware
	);
};