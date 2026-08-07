// src/reducer/taskReducer.js
import { seedTasks } from '../data/seedTasks.js';

export const initialState = {
  tasks: seedTasks,
  filter: 'all',
  priorityFilter: 'all',
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

    case 'REORDER_TASKS': {
      const { draggedId, targetId, position } = action.payload;

      if (String(draggedId) === String(targetId)) {
        return state;
      }

      const from = state.tasks.findIndex(
        (task) => String(task.id) === String(draggedId)
      );

      if (from === -1) {
        return state;
      }

      const nextTasks = [...state.tasks];
      const [moved] = nextTasks.splice(from, 1);

      const targetIndex = nextTasks.findIndex(
        (task) => String(task.id) === String(targetId)
      );

      if (targetIndex === -1) {
        return state;
      }

      const insertAt = position === 'after' ? targetIndex + 1 : targetIndex;
      nextTasks.splice(insertAt, 0, moved);

      return { ...state, tasks: nextTasks };
    }

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        priorityFilter: action.payload,
      };

    default:
      return state;
  }
}