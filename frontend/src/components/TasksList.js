import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Task from './Task';
import { getTasks } from '../redux/actions';
import '../css/components/TasksList.css';

const TasksList = () => {
  const [loading, setLoading] = useState(true);

  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getTasks(filter)).then(() => {
      setLoading(false);
    });
  }, [filter]);

  return (
    <div className="tasks-list__container">
      {loading ? (
        <div className="tasks-list__spinner-container">
          <CircularProgress className="spinner" />
        </div>
      ) : tasks && tasks.length ? (
        tasks.map((task, index) => {
          return <Task key={`task-${task._id}`} task={task} />;
        })
      ) : (
        <div className="tasks-list__empty">
          You do not have any {filter ? filter + ' ' : ''}tasks at the moment
        </div>
      )}
    </div>
  );
};

export default TasksList;
