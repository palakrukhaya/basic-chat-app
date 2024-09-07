const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connection", socket.id);
  const userId = socket.id;
  socket.emit("userId", userId);
  socket.on("message", (msg) => {
    console.log(msg, socket.id);
    io.emit("message", { text: msg, userId: socket.id });
  });
});

http.listen(9000, () => console.log("listening on http://localhost:9000"));
