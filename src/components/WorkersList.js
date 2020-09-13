import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Box, Heading, Flex, Progress, Divider, CircularProgress, CircularProgressLabel } from '@chakra-ui/core'
import { rangeBetween } from '../utils'
import { GrUserWorker } from 'react-icons/gr'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { handleMachinesQueue, handleSingleWorker } from '../redux/actions/general'

const Worker = connect(null, { handleMachinesQueue, handleSingleWorker })(
  ({ tasks, worker, taskName, startMachine, handleMachinesQueue, handleSingleWorker }) => {
    const [isDone, setIsDone] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [totalSeconds, setTotalSeconds] = useState(rangeBetween(1, 15))
    const [timeLeft, setTimeLeft] = useState(totalSeconds)

    useEffect(() => {
      if (!startMachine) {
        return
      }
      if (!timeLeft) {
        setIsDone(true)
        return
      }

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearInterval(intervalId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, startMachine])

    useEffect(() => {
      if (isDone) {
        handleMachinesQueue(taskName)
        handleSingleWorker(taskName)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDone])

    return (
      <Box
        p={5}
        mb={4}
        color={startMachine ? 'inherit' : 'white'}
        bg={startMachine ? 'white' : 'rgb(187 41 31 / 85%)'}
        position="relative"
        borderRadius=".5rem"
        boxShadow="0 2px 4px 0 #e3e9f3"
        border="1px solid #e8e8e8"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
          <Heading fontSize="md">Worker {worker}</Heading>
          <Box>
            <CircularProgress
              value={startMachine ? (1 - timeLeft / totalSeconds) * 100 : 0}
              color={isDone ? 'green' : 'blue'}
              thickness={0.1}
            >
              <CircularProgressLabel>{isDone ? 'Done' : `${timeLeft}s`}</CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Flex>

        {startMachine ? (
          <Progress
            hasStripe={!isDone}
            isAnimated
            color={isDone ? 'green' : 'blue'}
            value={startMachine ? (1 - timeLeft / totalSeconds) * 100 : 0}
            borderRadius="4px"
          />
        ) : (
          <Flex justifyContent="center" fontSize="12px" height="12px">
            Waiting for machine...
          </Flex>
        )}
      </Box>
    )
  }
)

const WorkersList = ({ tasksList, tasks, taskName }) => {
  const [machinesInQueue, setMachinesInQueue] = useState(tasks?.[taskName]?.machinesQueue)
  useEffect(() => {
    setMachinesInQueue(tasks?.[taskName]?.machinesQueue)
  }, [taskName, tasks])
  return (
    <Box className="workers-list" mt="20px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <GrUserWorker size="1.2em" />
          <Box mx="10px">
            <strong>{tasks?.[taskName]?.workers?.length}</strong>
          </Box>
        </Flex>

        <Flex alignItems="center">
          <CgSmartHomeWashMachine size="1.2em" />
          <Box mx="10px">
            <strong>{tasks?.[taskName]?.machines?.length}</strong>
          </Box>
        </Flex>
      </Flex>
      <Divider mb="30px" />
      {tasks?.[taskName]?.workers.map((worker, index) => (
        <Worker
          key={index}
          className="worker-item"
          worker={worker}
          tasks={tasks}
          taskName={taskName}
          startMachine={machinesInQueue === 0 || index >= machinesInQueue}
        />
      ))}
    </Box>
  )
}

const mapStateToProps = ({ general }) => ({
  tasks: general.tasks,
  tasksList: general.tasksList,
})
export default connect(mapStateToProps)(WorkersList)
