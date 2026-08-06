// src/context/TaskContext.jsx
import { createContext, useContext, useReducer } from 'react';
import { taskReducer, initialState } from '../reducer/taskReducer.js';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const { tasks, filter } = state;

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  const addTask = ({ title, description, status, priority }) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: crypto.randomUUID(),
        title,
        description,
        status,
        priority,
      },
    });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilter = (nextFilter) => {
    dispatch({ type: 'SET_FILTER', payload: nextFilter });
  };

  const value = { tasks, filteredTasks, filter, addTask, deleteTask, setFilter };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// The assignment specifies that the context lives in this file, so the consumer
// hook is exported alongside the provider. This only affects Fast Refresh:
// editing this file triggers a full reload instead of a hot update.
// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error('useTasks must be used inside a TaskProvider');
  }

  return context;
}