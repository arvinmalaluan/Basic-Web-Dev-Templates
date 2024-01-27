const socket = io("ws://localhost:3500");

function getUsername(e) {
  e.preventDefault();

  const username = document.querySelector("#sender");

  console.log(username.value);

  if (username.value) {
    document.getElementById("form-for-message").classList.remove("hide");
    document.getElementById("form-for-username").classList.add("hide");

    localStorage.setItem("username", username.value);
  }
}

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("#message-value");

  if (input.value) {
    const message_value = {
      message: input.value,
      sender: localStorage.getItem("username"),
    };
    socket.emit("message", JSON.stringify(message_value));
    input.value = "";
  }

  input.focus();
}

document
  .querySelector("#form-for-message")
  .addEventListener("submit", sendMessage);

document
  .querySelector("#form-for-username")
  .addEventListener("submit", getUsername);

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});
