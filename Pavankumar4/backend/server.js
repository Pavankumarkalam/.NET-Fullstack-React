// backend/server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// In-memory task and user storage
let tasks = [];
const users = [
  { username: "Mani", role: "teammember" },
  { username: "admin", role: "admin" },
];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send initial tasks and users when a client connects
  socket.emit("loadTasks", tasks);
  socket.emit("loadUsers", users);

  // Add a task
  socket.on("addTask", (task) => {
    tasks.push(task);
    io.emit("taskUpdated", tasks);
    if (task.assignee) {
      io.emit("notification", {
        message: `New task assigned to ${task.assignee}: ${task.title}`,
      });
    }
  });

  // Update a task (edit or reassign)
  socket.on("updateTask", (updatedTask) => {
    tasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    io.emit("taskUpdated", tasks);
    if (updatedTask.assignee) {
      io.emit("notification", {
        message: `Task updated for ${updatedTask.assignee}: ${updatedTask.title}`,
      });
    }
  });

  // Delete a task
  socket.on("deleteTask", (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    io.emit("taskUpdated", tasks);
  });

  // Remove user (Admin functionality)
  socket.on("removeUser", (username) => {
    io.emit("notification", {
      message: `User ${username} has been removed by admin`,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

