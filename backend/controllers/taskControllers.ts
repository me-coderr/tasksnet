import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ITask, Task } from "../models/taskModel";
import { ObjectId, isValidObjectId } from "mongoose";

interface INewTaskData {
  title: string;
  description: string | null;
  isConnected: boolean | null;
}

interface IUpdatingTaskData {
  _id: ObjectId;
  title: string | null;
  description: string | null;
  isConnected: boolean | null;
}

const fetchAll = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] | null = await Task.find();

    if (tasks) {
      res.status(200).send(tasks);
    } else {
      throw new Error("No tasks found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: "An unknown error occured" });
    }
  }
});

const createTask = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const taskData: INewTaskData = req.body;

    if (!taskData.title) {
      throw new Error("Request body must contain the title");
    }

    const task: ITask | null = await Task.create(taskData);

    if (task) {
      res.status(200).send(task);
    } else {
      throw new Error("Failed to create Task");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: "An unknown error occured" });
    }
  }
});

const updateTask = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const taskData: IUpdatingTaskData = req.body;

    if (!taskData._id) {
      throw new Error("Request body must contain the Task ID");
    } else if (!isValidObjectId(taskData._id)) {
      throw new Error("Invalid Task ID");
    }

    const updatedTask: ITask | null = await Task.findByIdAndUpdate(
      taskData._id,
      taskData,
      { new: true }
    );

    if (updatedTask) {
      res.status(200).send(updatedTask);
    } else {
      throw new Error("Task to update not found.");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: "An unknown error occured" });
    }
  }
});

const deleteTask = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const taskID: ObjectId | null = req.body._id;

    if (!taskID) {
      throw new Error("Request body must contain the Task ID");
    } else if (!isValidObjectId(taskID)) {
      throw new Error("Invalid Task ID");
    }

    const deletedTask: ITask | null = await Task.findByIdAndDelete(taskID);

    if (deletedTask) {
      res
        .status(200)
        .send({ message: "Task deleted successfully", deletedTask });
    } else {
      throw new Error("Task not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: "An unknown error occured" });
    }
  }
});

export { createTask, updateTask, fetchAll, deleteTask };
