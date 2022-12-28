import axios from "axios";

export const showTasksRequest = async () =>
  await axios.get('http://localhost:4000/tasks');

export const createTaskRequest = async (task) =>
  await axios.post('http://localhost:4000/tasks', task);

export const deleteTaskRequest = async (id) =>
  await axios.delete('http://localhost:4000/tasks/' + id);

export const getTaskRequest = async (id) =>
  await axios.get('http://localhost:4000/tasks/' + id);

export const editTaskRequest = async (id, task) =>
  await axios.put('http://localhost:4000/tasks/' + id, task);

export const editDoneTaskRequest = async (id, done) =>
  await axios.put('http://localhost:4000/tasks/' + id, { done }); 