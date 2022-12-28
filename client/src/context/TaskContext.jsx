import { createContext, useContext, useState } from 'react';
import {
  createTaskRequest,
  deleteTaskRequest,
  editDoneTaskRequest,
  editTaskRequest,
  getTaskRequest,
  showTasksRequest,
} from '../api/Task.api';

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('Use Tasks must be used within a TaskContextProvider');
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await showTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const result = await createTaskRequest(task);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (id, newFields) => {
    try {
      const response = await editTaskRequest(id, newFields);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const editDoneTask = async (id) => {
    try {
      const taskFound = tasks.find((task) => id === task.id);
      await editDoneTaskRequest(id, taskFound.done == 0 ? true : false);
      const taskIndex = tasks.findIndex((task) => task.id === id);
      tasks[taskIndex].done = tasks[taskIndex].done == 0 ? true : false;
      setTasks([...tasks]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, loadTasks, deleteTask, createTask, getTask, editTask, editDoneTask }}>
      {children}
    </TaskContext.Provider>
  );
};
