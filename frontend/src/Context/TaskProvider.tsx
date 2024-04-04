import { ObjectId } from "mongoose";
import { Document } from "mongoose";
import { ReactNode, createContext, useContext, useState } from "react";


export interface ITask extends Document {
  title: string;
  description: string | null;
  isCompleted: boolean;
}

export type TasksType = ITask[] | [];
export type OpenTaskType = ITask | null;

interface ITaskContext {
  tasks: TasksType; // array of tasks
  openTask: OpenTaskType; // a single task
  setTasks: React.Dispatch<React.SetStateAction<TasksType>>
  setOpenTask: React.Dispatch<React.SetStateAction<OpenTaskType>>
}


const TaskContext = createContext<ITaskContext>({tasks: [], openTask: null, setTasks: () => {}, setOpenTask: () => {}});

const TaskProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [tasks, setTasks] = useState<TasksType>([]);
  const [openTask, setOpenTask] = useState<OpenTaskType>(null);

  return <TaskContext.Provider value={{tasks, openTask, setTasks, setOpenTask }}>{children}</TaskContext.Provider>;
};

export const TaskState = (): ITaskContext => {
  return useContext(TaskContext);
}

export default TaskProvider;