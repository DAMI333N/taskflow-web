// src/reducer/taskReducer.js
import { seedTasks } from '../data/seedTasks.js';

export const initialState = {
  tasks: seedTasks,
  filter: 'all',
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          String(task.id) === String(action.payload.id)
            ? { ...task, ...action.payload }
            : task
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => String(task.id) !== String(action.payload)
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}