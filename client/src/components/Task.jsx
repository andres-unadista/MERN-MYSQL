import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

function Task({ task }) {
  const { deleteTask, editDoneTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const handleDone = async (id) => {
    await editDoneTask(id);
  };
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      <header className="flex justify-between">
        <h2>{task.title}</h2>
        <span>{task.done ? '✔' : '❌'}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.created_at}</span>
      <div className="flex justify-end gap-x-2 mt-3">
        <button className="bg-yellow-400 px-2 py-1 text-black" onClick={() => navigate('/edit/' + task.id)}>
          Edit
        </button>
        <button className="bg-red-300 px-2 py-1 text-black" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
        <button className="bg-orange-300 px-2 py-1 text-black" onClick={() => handleDone(task.id)}>
          Toggle done
        </button>
      </div>
    </div>
  );
}

export default Task;
