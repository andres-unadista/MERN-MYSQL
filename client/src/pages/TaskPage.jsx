import React, { useContext } from 'react';
import { useEffect } from 'react';
import Task from '../components/Task';
import { TaskContext } from '../context/TaskContext';

function TaskPage() {
  const { tasks, loadTasks } = useContext(TaskContext);

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0) return <h2>Not tasks yet</h2>;
    return tasks.map((task) => <Task task={task} key={task.id} />);
  }
  return (
    <div>
      <h1 className="text-white font-bold text-center mb-3">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

export default TaskPage;
