import React from 'react'
import { Heading, Flex } from '@chakra-ui/core'

const Header = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="white"
      background="linear-gradient(to right,#325b90, #5691c8)"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" fontWeight="900">
          TheWorker
        </Heading>
      </Flex>
    </Flex>
  )
}

export default Header
