// src/App.js

import React from 'react';
import { TaskProvider } from './context/TaskContext';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

/**
 * App component serves as the root of the Task Management Application.
 * It loads initial tasks (simulating SSR) and renders the AddTask and TaskList components.
 */
function App() {
  // Preload initial tasks
  const initialTasks = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn Create React App", completed: true },
    { id: 3, text: "Build a Task Management App", completed: false }
  ];

  return (
    <TaskProvider initialTasks={initialTasks}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Task Management App</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
