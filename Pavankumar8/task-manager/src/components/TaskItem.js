// src/components/TaskItem.js

import React from 'react';
import useTasks from '../hooks/useTasks';

/**
 * TaskItem component renders a single task with options to toggle or remove it.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.task - The task object (id, text, completed).
 */
const TaskItem = ({ task }) => {
  const { toggleTask, removeTask } = useTasks();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        border: '1px solid #ddd',
        padding: '8px',
        borderRadius: '4px'
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          flexGrow: 1,
          marginLeft: '8px'
        }}
      >
        {task.text}
      </span>
      <button onClick={() => removeTask(task.id)}>Remove</button>
    </div>
  );
};

export default TaskItem;
