import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger({
	collapsed: true
});

export default applyMiddleware(
	thunk,
	logger,
);
