import { ObjectId } from "mongodb";

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

export const getById = async (_id: string): Promise<Task[]> => {
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

export const deleteById = async (_id: string | ObjectId): Promise<void> => {
  const db = getDb();
  await db.collection("tasks").deleteOne({
    _id: new ObjectId(_id),
  });
};
