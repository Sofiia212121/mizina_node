const socket = io();

const form = document.getElementById("sendMessageForm");
const userNameInput = document.getElementById("userName");
const messageTextInput = document.getElementById("messageText");
const messagesDiv = document.getElementById("messages");

let currentUserId = sessionStorage.getItem("userId");
let currentUsername = sessionStorage.getItem("username");

socket.on("connect", function () {
  if (!currentUserId) {
    currentUserId = socket.id;
    sessionStorage.setItem("userId", currentUserId);
  }

  if (!currentUsername && userNameInput.value.trim() !== "") {
    currentUsername = userNameInput.value.trim();
    sessionStorage.setItem("username", currentUsername);
  }
});

function loadMessages(message) {
  messagesDiv.insertAdjacentHTML(
    "beforeend",
    `
      <div class="message-item ${message.userId === currentUserId ? "mine" : "others"}">
        ${message.text} <sub>by ${message.username}</sub>
      </div>
    `
  );
}

socket.on("loadMessages", function (messages) {
  messages.forEach(loadMessages);
});

socket.on("message", function (message) {
  loadMessages(message);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!currentUsername && userNameInput.value.trim() !== "") {
    currentUsername = userNameInput.value.trim();
    sessionStorage.setItem("username", currentUsername);
  }

  const username = currentUsername;
  const message = messageTextInput.value.trim();

  if (username && message) {
    socket.emit("newMessage", { userId: currentUserId, username, text: message });

    messageTextInput.value = "";
  }
});
