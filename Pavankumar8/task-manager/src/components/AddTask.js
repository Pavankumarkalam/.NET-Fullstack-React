// src/components/AddTask.js

import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

/**
 * AddTask component provides a form to add a new task.
 */
const AddTask = () => {
  // Local state to hold the new task input
  const [task, setTask] = useState('');
  const { addTask } = useTasks();

  /**
   * Handle form submission by adding a new task
   * and then clearing the input field.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only add the task if input is not empty
    if (task.trim() !== '') {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add new task"
        style={{ marginRight: '10px', width: '70%' }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
