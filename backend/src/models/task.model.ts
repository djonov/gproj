import Joi = require("joi");
import { ObjectId } from "mongodb";

import { Entity } from "./entity";

export enum TaskStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

export class Task extends Entity {
  public _id: ObjectId;
  public content: string;
  public status: TaskStatus;
  public createDate: Date;
  public changeDate: Date;

  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export const ValidationSchema_CreateTask = Joi.object({
  content: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(TaskStatus)),
});

export const ValidationSchema_UpdateTask = ValidationSchema_CreateTask.keys({
  _id: Joi.string().required(),
  content: Joi.string().optional(),
  status: Joi.string()
    .optional()
    .valid(...Object.values(TaskStatus)),
});
