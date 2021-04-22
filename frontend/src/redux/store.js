import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { TASK_STATUS } from '../constants';
import rootReducer from './reducers';

const initialState = {
  tasks: [],
  filter: TASK_STATUS.ACTIVE,
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
