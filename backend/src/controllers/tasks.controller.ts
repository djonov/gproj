import { logger } from "../helpers/log.helper";
import * as TasksDA from "../dataaccess/tasks.da";
import {
  Task,
  ValidationSchema_CreateTask,
  ValidationSchema_UpdateTask,
} from "../models/task.model";

export const getTasks = async (req, res, next) => {
  logger.info({ handler: "tasks/getTasks", query: req.query });

  const page = Number(req.query.page || 0);
  const size = Number(req.query.size || 10);

  let findOptions = {} as any;
  if (req.query.search) {
    findOptions = JSON.parse(req.query.search);
  }

  let sort = {} as any;
  if (req.query.sort) {
    sort = JSON.parse(req.query.sort);
  }

  const tasks = await TasksDA.find(findOptions, sort, page, size);

  res.status(200).json(tasks);
};

export const getTask = async (req, res, next) => {
  logger.info({ handler: "tasks/getTask", query: req.query });

  const id = req.query.id;
  const task = await TasksDA.getById(id);
  res.status(200).json(task);
};

export const createTask = async (req, res, next) => {
  logger.info({ handler: "tasks/createTask", body: req.body });

  const validation = ValidationSchema_CreateTask.validate(req.body);
  if (validation.error) {
    logger.error(validation.error);
    res.status(422).json(validation.error);
    next();
    return;
  }

  const task = await TasksDA.create(new Task(req.body));

  res.status(201).json(task);
};

export const updateTask = async (req, res, next) => {
  logger.info({
    handler: "tasks/updateTask",
    query: req.query,
    body: req.body,
  });

  const _id = req.params.id;
  const validation = ValidationSchema_UpdateTask.validate({
    ...req.body,
    _id,
  });
  if (validation.error) {
    logger.error(validation.error);
    res.status(422).json(validation.error);
    next();
    return;
  }

  const task = await TasksDA.updateById(_id, new Task(req.body));

  res.status(200).json(task);
};

export const deleteTask = async (req, res, next) => {
  logger.info({ handler: "tasks/deleteTask", body: req.query });

  const _id = req.params.id;

  if (!_id) {
    const error = `Query parameter "id" is missing`;
    logger.error(error);
    res.status(422).json(error);
    next();
    return;
  }

  await TasksDA.deleteById(_id);

  res.status(204).end();
};

export const updateTasks = async (req, res, next) => {
  logger.info({ handler: "tasks/updateTasks", body: req.body });

  const tasks = req.body;
  if (!Array.isArray(tasks)) {
    const error = `Body of this request should be an array of tasks`;
    logger.error(error);
    res.status(422).json(error);
    next();
    return;
  }

  const validationErrors = [];
  for (const task of tasks) {
    const validation = ValidationSchema_UpdateTask.validate(task);
    if (validation.error) {
      validationErrors.push({ error: validation.error, taskId: task._id });
    }
  }

  if (validationErrors.length > 0) {
    logger.error(validationErrors);
    res.status(422).json(validationErrors);
    next();
    return;
  }

  const updatedTasks = await TasksDA.updateManyTasks(
    tasks.map((task) => new Task(task))
  );
  res.status(200).json(updatedTasks);
};
