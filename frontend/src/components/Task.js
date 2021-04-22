import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import '../css/components/Task.css';
import { deleteTask, updateTask } from '../redux/actions';
import DeleteConfirmationDialog from './shared/DeleteConfirmationDialog';
import { TASK_STATUS } from '../constants';

const Task = (props) => {
  const [task, setTask] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  useEffect(() => {
    setContent(props.task.content);
  }, [props.task.content]);

  const removeTask = () => {
    return dispatch(deleteTask(task._id));
  };

  const toggleStatus = async () => {
    const newStatus =
      task.status === TASK_STATUS.COMPLETED ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED;
    dispatch(
      updateTask(task._id, {
        status: newStatus,
      }),
    ).then((updatedTask) => {
      setTask(updatedTask);
    });
  };

  const updateContent = () => {
    const newContent = content;
    dispatch(
      updateTask(task._id, {
        content: newContent,
      }),
    ).then((updatedTask) => {
      setTask(updatedTask);
      setEditMode(false);
    });
  };

  const handleDeleteConfirmation = (value) => {
    if (value) {
      setConfirmDelete(false);
      removeTask().then(() => {});
    } else {
      setConfirmDelete(false);
    }
  };

  return (
    <React.Fragment>
      <div
        className={cn('task__container', {
          'task__container-edit-mode': editMode,
          'task__container-completed': task.status === TASK_STATUS.COMPLETED,
        })}
      >
        <div
          className={cn('task__label', {
            'task__label-completed': task.status === TASK_STATUS.COMPLETED,
            'task__label-active': task.status === TASK_STATUS.ACTIVE,
          })}
        ></div>
        <div className={cn('task__status-checkbox-container', { hidden: editMode })}>
          <Checkbox
            size="medium"
            className="task__status-checkbox"
            checked={task.status === TASK_STATUS.COMPLETED}
            onChange={toggleStatus}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        {editMode ? (
          <div className="task__edit-container">
            <input
              type="text"
              className="default-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="task__edit-container-actions">
              <Button size="small" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                size="medium"
                className="submit-button"
                onClick={updateContent}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div
              className={cn('task__content', {
                'task__content-completed': task.status === 'completed',
              })}
            >
              <div className={cn({ strikethrough: task.status === 'completed' })}>
                {task.content}
              </div>
            </div>
            <div className="task__actions">
              {task.status !== 'completed' ? (
                <button
                  className={cn('task__action', 'task__action-edit')}
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon />
                </button>
              ) : (
                ''
              )}
              <button
                className={cn('task__action', 'task__action-delete')}
                onClick={() => setConfirmDelete(true)}
              >
                <DeleteIcon />
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
      <DeleteConfirmationDialog
        taskContent={task.content}
        open={confirmDelete}
        onClose={handleDeleteConfirmation}
      />
    </React.Fragment>
  );
};

export default Task;
