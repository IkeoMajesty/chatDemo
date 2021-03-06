//Make connection
const socket = io.connect("http://localhost:8888");

// Query DOM

var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//Emit events

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});
message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//Listen for events
socket.on("chat", data => {
  console.log(data);

  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  feedback.innerHTML = null;
  message.value = null;
});
socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});
