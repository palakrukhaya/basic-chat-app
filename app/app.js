const socket = io("ws://localhost:9000");

let currentUserId;

socket.on("userId", (id) => {
  currentUserId = id;
  console.log("User ID assigned:", currentUserId);
});

socket.on("message", ({ text, userId }) => {
  const el = document.createElement("li");
  const name = document.createElement("p");

  if (userId === currentUserId) {
    el.classList.add("current-user");
  } else {
    el.classList.add("not-current-user");
  }

  el.textContent = text;
  name.textContent = userId.substr(0, 2);
  el.appendChild(name);
  console.log(el, "element");
  document.querySelector("ul").appendChild(el);
});

document.querySelector("button").onclick = () => {
  const text = document.querySelector("input").value;
  socket.emit("message", text);
  document.querySelector("input").value = "";
};
