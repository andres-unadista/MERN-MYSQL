import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { TaskContext } from '../context/TaskContext';

import { Formik, Form, Field, ErrorMessage } from 'formik';

function TaskForm() {
  const { createTask, getTask, editTask } = useContext(TaskContext);
  const [task, setTask] = useState({
    title: '',
    description: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      const task = await getTask(params.id);
      setTask({
        title: task.title,
        description: task.description,
      });
      console.log(task);
    };
    if (params.id) {
      loadTask();
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold uppercase text-center">{params.id ? 'Edit Task' : 'New Task'}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          } else if (!values.description) {
            errors.description = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (params.id) {
            await editTask(params.id, values);
            navigate('/');
          } else {
            await createTask(values);
            navigate('/');
          }
          actions.resetForm();
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
            <label className="block">Title</label>
            <Field
              type="text"
              name="title"
              placeholder="write a task"
              value={values.title}
              className="px-2 py-1 rounded-sm w-full"
            />
            <ErrorMessage className="pb-1" name="title" component="div" />
            <label className="block">Description</label>
            <Field
              name="description"
              as="textarea"
              placeholder="write a description"
              className="px-2 py-1 rounded-sm w-full"
              value={values.description}
            />
            <ErrorMessage className="pb-1" name="description" component="div" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md"
            >
              {isSubmitting ? 'saving...' : 'save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
