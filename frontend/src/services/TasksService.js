import http from '../axios';

const getAll = (filter) => {
  const findOptions = {};
  if (filter) {
    findOptions['status'] = filter;
  }
  return http.get(
    `/tasks?search=${encodeURIComponent(JSON.stringify(findOptions))}&sort={"createDate": -1}`,
  );
};

const get = (id) => {
  return http.get(`/tasks/${id}`);
};

const create = (task) => {
  return http.post('/tasks', task);
};

const update = (id, task) => {
  return http.put(`/tasks/${id}`, task);
};

const remove = (id) => {
  return http.delete(`/tasks/${id}`);
};

const findByContent = (content) => {
  return http.get(`/tasks?content=${content}`);
};

const TasksService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByContent,
};

export default TasksService;
