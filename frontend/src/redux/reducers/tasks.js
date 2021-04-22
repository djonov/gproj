import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from '../actionTypes';

const initialState = [];

const tasksReducer = (tasks = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK: {
      return [payload, ...tasks];
    }
    case GET_TASKS: {
      return payload;
    }
    case UPDATE_TASK: {
      return tasks.map((task) => {
        if (task._id === payload._id) {
          return {
            ...task,
            ...payload,
          };
        } else {
          return task;
        }
      });
    }
    case DELETE_TASK:
      return tasks.filter(({ _id }) => _id !== payload._id);
    default:
      return tasks;
  }
};

export default tasksReducer;
