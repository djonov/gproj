import React from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import '../css/components/TaskFilters.css';
import { updateFilter } from '../redux/actions';
import { TASK_STATUS } from '../constants';

const TaskFilters = () => {
  const [value, setValue] = React.useState(TASK_STATUS.ACTIVE);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(updateFilter(newValue));
  };

  return (
    <div className="task-filters__container">
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="tasks filter tabs"
        >
          <Tab label="Active" value={TASK_STATUS.ACTIVE} />
          <Tab label="Completed" value={TASK_STATUS.COMPLETED} />
          <Tab label="All" value="" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default TaskFilters;
