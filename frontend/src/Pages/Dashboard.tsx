import React, { useEffect } from 'react'
import { TaskState } from '../Context/TaskProvider'
import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import Task from '../Components/Task';

const SERVER_URL = "http://localhost:5000/api"

const Dashboard = () => {
    const {tasks, openTask, setTasks, setOpenTask} = TaskState();

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/tasks/`);
        const data = await response.json();
  
        if(data) {
          setTasks(data);
        }
      } catch(err) {
        if(err instanceof Error) {
          console.log(err.message);
          return;
        }
        console.log(`Unknown error occured while fetching data from server`);
      }
    }

    useEffect(() => {
      fetchTasks();
    }, [])

  return <Box>
    {openTask? (
      <Task />          
      ) : (
      tasks && tasks.map((task) => 
        <Card onClick={() => setOpenTask(task)} key={task._id}>
          <CardHeader>
            <Text>{task.title}</Text>
          </CardHeader>
          <CardBody>
            <Text>{task.description}</Text>
          </CardBody>
        </Card>
        )
    )}
  </Box>
}

export default Dashboard
