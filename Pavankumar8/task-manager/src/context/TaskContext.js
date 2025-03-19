// src/context/TaskContext.js

import React, { createContext, useReducer } from 'react';

// Create a Context for the tasks
export const TaskContext = createContext();

/**
 * Reducer function to manage task state based on action types.
 * Supported actions: SET_TASKS, ADD_TASK, REMOVE_TASK, TOGGLE_TASK.
 *
 * @param {Array} state - The current state (list of tasks)
 * @param {Object} action - The action dispatched containing type and payload
 * @returns {Array} - The updated state (list of tasks)
 */
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

/**
 * TaskProvider component wraps its children with the TaskContext.
 * It accepts an optional initialTasks array to preload tasks.
 *
 * @param {Object} props
 * @param {Array} props.initialTasks - Initial list of tasks to load
 * @param {JSX.Element} props.children - Child components that need access to the task state
 */
export const TaskProvider = ({ children, initialTasks = [] }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
