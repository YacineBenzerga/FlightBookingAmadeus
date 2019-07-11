import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
/* import flightReducer from './reducers/flight'; */
import hotelReducer from './reducers/hotel';

const reducer = combineReducers({
  /* flight: flightReducer, */ hotel: hotelReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
