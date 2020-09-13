import React from 'react'
import { ThemeProvider, CSSReset, Box, Grid, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import FactoryForm from './components/FactoryForm'
import FactoryTasksForm from './components/FactoryTasksForm'
import { connect } from 'react-redux'
import WorkersList from './components/WorkersList'
import Header from './components/Header'
import { isSolid } from 'is-solid'
import { AiOutlineCheckCircle } from 'react-icons/ai'

function App({ tasks, tasksOrder }) {
  return (
    <ThemeProvider>
      <Global
        styles={css`
          body {
            background-color: #eef1f3;
          }
        `}
      />
      <CSSReset />
      <Header />
      <Grid className="App" maxWidth="1200px" mx="auto" mt="2rem" templateColumns="40% auto" gap={6}>
        <Box className="factory-form-wrapper" bg="white" p="2rem" borderRadius=".5rem" boxShadow="0 2px 4px 0 #e3e9f3">
          <Box>
            <FactoryTasksForm />
          </Box>
        </Box>
        <Box bg="white" p="2rem" borderRadius=".5rem" boxShadow="0 2px 4px 0 #e3e9f3">
          {!isSolid(tasks) && <Box>No tasks</Box>}
          {/* <WorkersList /> */}
          {isSolid(tasks) && (
            <Tabs>
              <TabList>
                {tasksOrder.map((item, index) => (
                  <Tab key={index}>
                    {() => {
                      debugger
                    }}
                    {item}{' '}
                    {isSolid(tasks[item]) && tasks?.[item]?.workersDone === tasks?.[item]?.workers?.length ? (
                      <Box mx="1rem">
                        <AiOutlineCheckCircle color="green" />
                      </Box>
                    ) : (
                      ''
                    )}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {tasksOrder.map((item, index) => (
                  <TabPanel key={index}>
                    {isSolid(tasks[item]) ? (
                      <WorkersList taskName={item} />
                    ) : (
                      <>
                        <Box my="30px">
                          Set workers and machines for <strong>{item}</strong>
                        </Box>
                        <FactoryForm taskName={item} />
                      </>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          )}
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

const mapStateToProps = ({ general }) => ({
  tasksList: general.tasksList,
  tasks: general.tasks,
  tasksOrder: general.tasksOrder,
})
export default connect(mapStateToProps)(App)
