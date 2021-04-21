import { ObjectId } from "mongodb";
import * as _ from "lodash";

import { getDb } from "../db";
import { Task } from "../models/task.model";

export const find = async (
  findOptions: any,
  sort: any,
  page = 0,
  size = 10
): Promise<Task[]> => {
  const db = getDb();
  return db
    .collection("tasks")
    .find(findOptions)
    .sort(sort)
    .skip(size * page)
    .limit(size)
    .toArray();
};

/**
 * This is an example comment to show that I care for the team :)
 * @param _id id of the task
 * @returns If task with the _id exists, it returns Task, otherwise it returns null
 */
export const getById = async (_id: string): Promise<Task | null> => {
  const db = getDb();
  return db.collection("tasks").findOne({
    _id: new ObjectId(_id),
  });
};

export const create = async (task: Task): Promise<Task> => {
  const db = getDb();
  task.setMetadata();
  const createResult = await db.collection("tasks").insertOne(task);
  task._id = createResult.insertedId;
  return task;
};

export const updateById = async (
  _id: string | ObjectId,
  task: Partial<Task>
): Promise<Task> => {
  const db = getDb();
  task.setMetadata();
  const result = await db.collection("tasks").findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: task,
    },
    {
      returnOriginal: false,
    }
  );
  return result.value;
};

/**
 * This is one example of a code that would be helpful if the application needs to update huge amount of data at once
 * @param tasks It receieves a list of tasks that have different fields for update
 * @returns Updated tasks
 */
export const updateManyTasks = async (tasks: Task[]): Promise<Task[]> => {
  const db = getDb();
  const bulkWriteOperations = [];

  for (const task of tasks) {
    task.setMetadata();
    bulkWriteOperations.push({
      updateOne: {
        filter: { _id: new ObjectId(task._id) },
        update: { $set: _.omit(task, "_id") },
        upsert: false,
      },
    });
  }

  await db.collection("tasks").bulkWrite(bulkWriteOperations);

  return tasks;
};

export const deleteById = async (_id: string | ObjectId): Promise<void> => {
  const db = getDb();
  await db.collection("tasks").deleteOne({
    _id: new ObjectId(_id),
  });
};
