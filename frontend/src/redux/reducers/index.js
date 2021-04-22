import { combineReducers } from 'redux';

import tasks from './tasks';
import filter from './filters';

export default combineReducers({ tasks, filter });
