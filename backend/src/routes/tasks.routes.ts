import * as express from "express";

import { asyncHandler } from "../handler";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  updateTasks,
} from "../controllers/tasks.controller";

export const router = express.Router();

router.get("/", asyncHandler(getTasks));
router.get("/:id", asyncHandler(getTask));
router.post("/", asyncHandler(createTask));
router.put("/", asyncHandler(updateTasks));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));
