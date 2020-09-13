export default {
  testInitialState: {
    isLoading: false,
    workers: [],
    machines: 0,
    tasksList: ['task three'],
    tasks: {
      'task one': {
        workers: [0, 1, 2, 3],
        machines: [0, 1, 2],
        machinesQueue: 1,
        isRunning: true,
      },
      'task two': {
        workers: [0, 1],
        machines: [0, 1, 2, 3],
        machinesQueue: 0,
        isRunning: true,
      },
    },
    tasksOrder: ['task one', 'task two'],
    uncompletedTasks: ['task one', 'task two', 'task three'],
    completedTasks: [],
  },
}
