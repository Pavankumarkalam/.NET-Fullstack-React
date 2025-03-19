// src/components/TaskList.js

import React from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';

/**
 * TaskList component displays all tasks along with a summary.
 */
const TaskList = () => {
  const { tasks } = useTasks();

  // Compute total tasks and number of tasks marked as completed
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div>
      <h2>Task List</h2>
      <p>
        Total Tasks: {totalTasks} | Completed: {completedTasks}
      </p>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
