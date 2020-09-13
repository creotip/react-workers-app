import produce from 'immer'
import { arrayFromNumber } from '../../utils'

export const actionTypes = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_TASKS: 'SET_TASKS',
  SET_WORKERS_MACHINES_TO_TASK: 'SET_WORKERS_MACHINES_TO_TASK',
  SET_SINGLE_WORKER_DONE: 'SET_SINGLE_WORKER_DONE',
}

export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
})

export const handleWorkers = (workersNumber, machinesNumber, taskName) => (dispatch, getState) => {
  const { general } = getState()

  const newState = produce(general.tasks, (draftState) => {
    draftState[taskName].workers = arrayFromNumber(+workersNumber)
    draftState[taskName].workersDone = 0
    draftState[taskName].machines = arrayFromNumber(+machinesNumber)
    draftState[taskName].machinesQueue = Math.max(0, +workersNumber - +machinesNumber)
    draftState[taskName].isRunning = true
  })

  dispatch({
    type: actionTypes.SET_WORKERS_MACHINES_TO_TASK,
    payload: newState,
  })
}

export const handleMachinesQueue = (taskName) => (dispatch, getState) => {
  const { general } = getState()
  if (general.tasks?.[taskName]?.machinesQueue === 0) {
    return
  }
  const newState = produce(general.tasks, (draftState) => {
    draftState[taskName].machinesQueue = Math.max(0, general.tasks[taskName].machinesQueue - 1)
  })

  dispatch({
    type: actionTypes.SET_WORKERS_MACHINES_TO_TASK,
    payload: newState,
  })
}

export const handleSingleWorker = (taskName) => (dispatch, getState) => {
  const { general } = getState()
  const newState = produce(general.tasks, (draftState) => {
    draftState[taskName].workersDone = general.tasks?.[taskName]?.workersDone + 1
  })

  dispatch({
    type: actionTypes.SET_SINGLE_WORKER_DONE,
    payload: newState,
  })
}

export const handleTasks = (selectedTask) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_TASKS,
    payload: selectedTask,
  })
}
