import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Button from '@material-ui/core/Button';

import { addTask } from '../redux/actions';
import '../css/components/TaskEditor.css';
import { TASK_STATUS } from '../constants';

const AddTask = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ content, status: TASK_STATUS.ACTIVE }));
    setContent('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="task-editor__container">
      <input
        className="default-input"
        onChange={(e) => setContent(e.target.value)}
        onKeyUp={(e) => handleKeyPress(e)}
        value={content}
        placeholder="What's your next task?"
      />
      <Button
        disabled={content === ''}
        variant="contained"
        size="medium"
        className={cn('submit-button', 'task-editor__add-button')}
        onClick={handleAddTask}
      >
        Add
      </Button>
    </div>
  );
};

export default AddTask;
