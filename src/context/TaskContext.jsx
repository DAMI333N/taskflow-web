// src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useReducer } from 'react';
import { taskReducer, initialState } from '../reducer/taskReducer.js';

const TaskContext = createContext(null);

const STORAGE_KEY = 'task-manager.tasks';

function initTaskState(defaultState) {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === null) {
      return defaultState;
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return defaultState;
    }

    return { ...defaultState, tasks: parsed };
  } catch {
    return defaultState;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState, initTaskState);

  const { tasks, filter } = state;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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

  const updateTask = (updatedTask) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilter = (nextFilter) => {
    dispatch({ type: 'SET_FILTER', payload: nextFilter });
  };

  const value = {
    tasks,
    filteredTasks,
    filter,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
  };

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