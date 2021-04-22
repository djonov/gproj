import { TASK_STATUS } from '../../constants';
import { UPDATE_FILTER } from '../actionTypes';

const initialState = TASK_STATUS.ACTIVE;

const filtersReducer = (filter = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_FILTER: {
      return payload;
    }
    default:
      return filter;
  }
};

export default filtersReducer;
