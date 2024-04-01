import { Router } from "express";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../controllers/tasksControllers";

const router = Router();

router.post("/create", createTask);
router.put("/update", updateTask);
router.get("/", fetchTasks);
router.delete("/delete", deleteTask);

export { router };
