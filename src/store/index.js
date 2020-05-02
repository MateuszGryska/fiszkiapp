import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import ReduxThunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(ReduxThunk)),
);
/* eslint-enable */

export default store;
