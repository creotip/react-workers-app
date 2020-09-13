import { useForm } from 'react-hook-form'
import React from 'react'
import { FormErrorMessage, FormControl, Input, Button } from '@chakra-ui/core'
import { connect } from 'react-redux'
import { handleWorkers } from '../redux/actions/general'

const FactoryForm = ({ handleWorkers, taskName }) => {
  const { handleSubmit, errors, register, formState, reset } = useForm()

  function validateName(value, type) {
    let error
    if (!value) {
      error = `This field is required`
    } else if (value > 20) {
      error = `Please add up to 20 ${type}`
    }
    return error || true
  }

  function onSubmit(values) {
    const { workers, machines } = values
    handleWorkers(workers, machines, taskName)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.workers} mb="4">
        <Input
          name="workers"
          placeholder="Workers"
          type="number"
          ref={register({ validate: (value) => validateName(value, 'workers') })}
        />
        <FormErrorMessage>{errors.workers && errors.workers.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.machines}>
        <Input
          name="machines"
          placeholder="Machines"
          type="number"
          ref={register({ validate: (value) => validateName(value, 'machines') })}
        />
        <FormErrorMessage>{errors.machines && errors.machines.message}</FormErrorMessage>
      </FormControl>

      <Button mt={4} variantColor="blue" isLoading={formState.isSubmitting} type="submit">
        Set workers
      </Button>
    </form>
  )
}

export default connect(null, { handleWorkers })(FactoryForm)
