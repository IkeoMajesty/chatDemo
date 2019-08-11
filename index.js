const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();
const server = app.listen(8888, () => {
  console.log("listening on 8888");
});

//Static files
app.use(express.static("public"));

//Socket setup
const io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("chat", data => {
    console.log(data);

    io.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
