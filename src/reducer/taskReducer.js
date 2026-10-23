// src/reducer/taskReducer.js
export const initialState = {
  tasks: [],
  isLoading: true,
  error: null,
  filter: 'all',
  priorityFilter: 'all',
};

export function taskReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          String(task.id) === String(action.payload.id) ? action.payload : task
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

    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        priorityFilter: action.payload,
      };

    default:
      return state;
  }
}