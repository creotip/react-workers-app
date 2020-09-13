import { useForm } from 'react-hook-form'
import React from 'react'
import { Box, FormErrorMessage, Select, FormControl, Button, Input } from '@chakra-ui/core'
import { connect } from 'react-redux'
import { handleTasks } from '../redux/actions/general'

const FactoryTasksForm = ({ tasksList, handleTasks }) => {
  const { handleSubmit, errors, register, formState, reset } = useForm()

  function onSubmit(values) {
    const { tasks, taskName } = values

    if (tasks) {
      reset()
      handleTasks(tasks)
    } else if (taskName) {
      reset()
      handleTasks(taskName)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.tasks}>
        <Select name="tasks" placeholder="Choose predefined task" ref={register}>
          {tasksList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.tasks && errors.tasks.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} variantColor="blue" isLoading={formState.isSubmitting} type="submit">
        Set Task
      </Button>
      <Box textAlign="center" my="2rem">
        Or add task manually
      </Box>

      <FormControl isInvalid={errors.taskName}>
        {/* <FormLabel htmlFor="name">First name</FormLabel> */}
        <Input name="taskName" placeholder="Task name" ref={register()} />
        <FormErrorMessage>{errors.taskName && errors.taskName.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} variantColor="blue" isLoading={formState.isSubmitting} type="submit">
        Set Task
      </Button>
    </form>
  )
}
const mapStateToProps = ({ general }) => ({
  tasksList: general.tasksList,
  tasks: general.tasks,
})
export default connect(mapStateToProps, { handleTasks })(FactoryTasksForm)
