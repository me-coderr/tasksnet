import { ObjectId } from 'mongoose';
import React, { useEffect } from 'react';
import { TaskState } from '../Context/TaskProvider';
import { Box, Text } from '@chakra-ui/react';

interface TaskProps {
  id: ObjectId;
}

const SERVER_URL = "http://localhost:5000/api"

const Task = () => {

  const {openTask, setOpenTask} = TaskState();

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/tasks/`, {
          method: 'GET',
          body: JSON.stringify({_id: openTask?._id})
        });
        const data = await response.json();

      } catch(err) {
        if(err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(`Unknown error found`);
        }
      }
    }
    useEffect(() => {
        fetchTasks();
    }, [])

  return (
    <div onClick={() => setOpenTask(null)}>
      Opened Task
      <Box>
        <Text>{openTask?.title}</Text>
        <Text>{openTask?.description}</Text>
      </Box>
    </div>
  );
}

export default Task;
