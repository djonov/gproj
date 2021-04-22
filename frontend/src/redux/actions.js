import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_FILTER, UPDATE_TASK } from './actionTypes';
import TasksService from '../services/TasksService';

export const getTasks = (filter) => async (dispatch) => {
  try {
    const res = await TasksService.getAll(filter);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const res = await TasksService.create(task);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const res = await TasksService.update(id, task);

    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await TasksService.remove(id);

    dispatch({
      type: DELETE_TASK,
      payload: { _id: id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateFilter = (filter) => (dispatch) => {
  dispatch({
    type: UPDATE_FILTER,
    payload: filter,
  });
};
