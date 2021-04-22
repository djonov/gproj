import AddTask from './components/AddTask';
import TasksList from './components/TasksList';
import TaskFilters from './components/TaskFilters';
import './css/TodoApp.css';

function TodoApp() {
  return (
    <div className="app">
      <div className="app__container">
        <AddTask />
        <TaskFilters />
        <TasksList />
      </div>
    </div>
  );
}

export default TodoApp;
