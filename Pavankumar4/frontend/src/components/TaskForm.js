// src/components/TaskForm.js

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./TaskForm.css";

function TaskForm({ socket }) {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("");
  const [users, setUsers] = useState([]);

  // Define the default list of users (same as your login credentials)
  const defaultUsers = [
    { username: "Mani", role: "teammember" },
    { username: "admin", role: "admin" },
  ];

  useEffect(() => {
    // Listen for the "loadUsers" event from the backend
    socket.on("loadUsers", (loadedUsers) => {
      if (loadedUsers && loadedUsers.length > 0) {
        setUsers(loadedUsers);
      } else {
        // Fallback on defaultUsers if none received
        setUsers(defaultUsers);
      }
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off("loadUsers");
    };
  }, [socket]);

  // In case users array is still empty, use the default list:
  const userOptions = users.length > 0 ? users : defaultUsers;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure title and assignee are provided
    if (!title.trim() || !assignee.trim()) return;

    const newTask = {
      id: Date.now(), // simple unique id
      title,
      description,
      deadline,
      assignee, // This field will be one of the registered users
      createdBy: user.username,
    };

    socket.emit("addTask", newTask);

    // Reset form fields
    setTitle("");
    setDescription("");
    setDeadline("");
    setAssignee("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Create New Task</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        required
      >
        <option value="">Select Assignee</option>
        {userOptions.map((u) => (
          <option key={u.username} value={u.username}>
            {u.username} ({u.role})
          </option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;


