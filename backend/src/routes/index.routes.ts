import * as express from "express";

import * as tasksRouter from "./tasks.routes";

export const todo = express.Router();

todo.use("/tasks", tasksRouter.router);
