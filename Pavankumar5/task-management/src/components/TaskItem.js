import React from "react";

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <p>{task.title}</p>
      <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
