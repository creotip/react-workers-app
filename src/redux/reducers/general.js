import { actionTypes } from '../actions/general'

export const initialState = {
  isLoading: false,
  tasksList: ['Run program', 'Configure production', 'Run assembly line'],
  tasks: [],
  tasksOrder: [],
  completedTasks: [],
}

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_LOADING:
      return {
        isLoading: true,
      }

    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasks: { ...state.tasks, [action.payload]: {} },
        tasksOrder: [...state.tasksOrder, action.payload],
        tasksList: state.tasksList.filter((item) => item !== action.payload),
      }

    case actionTypes.SET_WORKERS_MACHINES_TO_TASK:
      return {
        ...state,
        tasks: action.payload,
      }
    case actionTypes.SET_SINGLE_WORKER_DONE:
      return {
        ...state,
        tasks: action.payload,
      }
    default:
      return state
  }
}

export default generalReducer
