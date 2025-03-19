import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch({ type: "ADD_TASK", payload: { id: Date.now(), title: newTask } });
      setNewTask("");
    }
  };

  return (
    <div className="container dashboard mt-5">
      <h2>Task Dashboard</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button className="btn btn-outline-primary" onClick={handleAddTask}>Add Task</button>
      </div>
      <TaskList />
    </div>
  );
};

export default Dashboard;
