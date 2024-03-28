import { Router } from "express";
import {
  createTask,
  deleteTask,
  fetchAll,
  updateTask,
} from "../controllers/taskControllers";

const router = Router();

router.post("/create", createTask);
router.put("/update", updateTask);
router.get("/", fetchAll);
router.delete("/delete", deleteTask);

export { router };
