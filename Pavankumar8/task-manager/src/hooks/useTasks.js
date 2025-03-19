// src/hooks/useTasks.js

import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

/**
 * Custom hook to encapsulate task management logic.
 * Provides the current tasks and functions to add, remove, and toggle tasks.
 *
 * @returns {Object} - { tasks, addTask, removeTask, toggleTask }
 */
const useTasks = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  /**
   * Adds a new task with the given text.
   * @param {string} text - The task description.
   */
  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // Use current timestamp as a unique ID
      text,
      completed: false
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  /**
   * Removes a task based on its ID.
   * @param {number} id - The ID of the task to remove.
   */
  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  /**
   * Toggles the completed status of a task.
   * @param {number} id - The ID of the task to toggle.
   */
  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return { tasks, addTask, removeTask, toggleTask };
};

export default useTasks;
