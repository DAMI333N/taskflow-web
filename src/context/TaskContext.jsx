// src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useReducer } from 'react';
import { taskReducer, initialState } from '../reducer/taskReducer.js';
import * as tasksApi from '../api/tasksApi.js';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const { tasks, isLoading, error, filter, priorityFilter } = state;

  useEffect(() => {
    // StrictMode mounts twice in development; ignore the first run's result.
    let ignore = false;

    dispatch({ type: 'FETCH_START' });

    tasksApi
      .listTasks()
      .then((serverTasks) => {
        if (!ignore) {
          dispatch({ type: 'FETCH_SUCCESS', payload: serverTasks });
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          dispatch({ type: 'FETCH_ERROR', payload: fetchError.message });
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatches = filter === 'all' || task.status === filter;
    const priorityMatches =
      priorityFilter === 'all' || task.priority === priorityFilter;

    return statusMatches && priorityMatches;
  });

  // Mutations call the API first and only touch state with the server's
  // response. Errors are rethrown so the calling component can show them.
  const addTask = async (fields) => {
    const created = await tasksApi.createTask(fields);
    dispatch({ type: 'ADD_TASK', payload: created });
    return created;
  };

  const updateTask = async (id, fields) => {
    const updated = await tasksApi.updateTask(id, fields);
    dispatch({ type: 'UPDATE_TASK', payload: updated });
    return updated;
  };

  const deleteTask = async (id) => {
    await tasksApi.removeTask(id);
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilter = (nextFilter) => {
    dispatch({ type: 'SET_FILTER', payload: nextFilter });
  };

  const setPriorityFilter = (nextPriorityFilter) => {
    dispatch({ type: 'SET_PRIORITY_FILTER', payload: nextPriorityFilter });
  };

  const value = {
    tasks,
    filteredTasks,
    isLoading,
    error,
    filter,
    priorityFilter,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setPriorityFilter,
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
