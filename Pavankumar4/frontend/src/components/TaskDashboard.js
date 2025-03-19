// src/components/TaskDashboard.js

import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import TaskForm from "./TaskForm";
import "./TaskDashboard.css";

// Connect to the backend (ensure the URL/port matches your server)
const socket = io("http://localhost:5000");

function TaskDashboard() {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [removeUsername, setRemoveUsername] = useState("");

  useEffect(() => {
    // Load initial tasks
    socket.on("loadTasks", (loadedTasks) => {
      setTasks(loadedTasks);
    });

    // Listen for task updates
    socket.on("taskUpdated", (updatedTasks) => {
      setTasks(updatedTasks);
    });

    // Listen for notifications from the server
    socket.on("notification", (notif) => {
      setNotifications((prev) => [...prev, notif]);
      // Auto-remove the notification after 3 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n !== notif));
      }, 3000);
    });

    return () => {
      socket.off("loadTasks");
      socket.off("taskUpdated");
      socket.off("notification");
    };
  }, []);

  // Delete task event
  const deleteTask = (taskId) => {
    socket.emit("deleteTask", taskId);
  };

  // Update a task; 
  // Team members can update only tasks assigned to them.
  // Admins can update, edit, and reassign tasks.
  const updateTask = (task) => {
    let updatedTask = {};
    if (user.role === "admin") {
      const newTitle = prompt("Enter new title", task.title);
      const newDescription = prompt("Enter new description", task.description);
      const newDeadline = prompt("Enter new deadline", task.deadline);
      const newAssignee = prompt("Enter new assignee", task.assignee);
      if (!newTitle || newTitle.trim() === "") return;
      updatedTask = {
        ...task,
        title: newTitle,
        description: newDescription,
        deadline: newDeadline,
        assignee: newAssignee,
      };
    } else {
      if (task.assignee !== user.username) {
        alert("You can only edit tasks assigned to you.");
        return;
      }
      const newTitle = prompt("Enter new title", task.title);
      const newDescription = prompt("Enter new description", task.description);
      if (!newTitle || newTitle.trim() === "") return;
      updatedTask = { ...task, title: newTitle, description: newDescription };
    }
    socket.emit("updateTask", updatedTask);
  };

  // Handle remove user (Admin-only)
  const handleRemoveUser = (e) => {
    e.preventDefault();
    if (removeUsername.trim() === "") return;
    socket.emit("removeUser", removeUsername);
    setRemoveUsername("");
  };

  return (
    <div className="dashboard-container">
      <h1>Real-Time Task Management Dashboard</h1>
      <p>
        Logged in as: <strong>{user.username}</strong> ({user.role})
      </p>

      {/* Task creation form */}
      <TaskForm socket={socket} />

      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-details">
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Assignee: {task.assignee}</p>
              <p>Created By: {task.createdBy}</p>
            </div>
            <div className="task-actions">
              {(user.role === "admin" ||
                (user.role === "teammember" && task.assignee === user.username)) && (
                <>
                  <button onClick={() => updateTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
              {user.role === "admin" && (
                <button
                  onClick={() => {
                    const newAssignee = prompt("Enter new assignee", task.assignee);
                    if (newAssignee && newAssignee.trim() !== "") {
                      const updated = { ...task, assignee: newAssignee };
                      socket.emit("updateTask", updated);
                    }
                  }}
                >
                  Reassign
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Admin-only: Remove Inactive User */}
      {user.role === "admin" && (
        <div>
          <h3>Remove Inactive User</h3>
          <form className="remove-user-form" onSubmit={handleRemoveUser}>
            <input
              type="text"
              placeholder="Username to remove"
              value={removeUsername}
              onChange={(e) => setRemoveUsername(e.target.value)}
            />
            <button type="submit">Remove User</button>
          </form>
        </div>
      )}

      {/* Notifications */}
      <div className="notification-container">
        {notifications.map((notif, index) => (
          <div key={index} className="notification">
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskDashboard;

