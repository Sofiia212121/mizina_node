document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.querySelector("#messages");
  const sendMessageForm = document.querySelector("#sendMessageForm");
  const userNameInput = sendMessageForm.querySelector("#userName");
  const messageText = sendMessageForm.querySelector("#messageText");
  let username = "";
  let userId = sessionStorage.getItem("userId");
  messageText.focus();
  messageText.value = "";

  if (!userId) {
    userId = Math.floor(Date.now() / 1000).toString();
    sessionStorage.setItem("userId", userId);
  }

  function loadMessages() {
    fetch(`/getMessages`)
      .then((response) => response.json())
      .then((data) => {
        messagesContainer.innerHTML = "";
        data.forEach((message) => {
          messagesContainer.insertAdjacentHTML(
            "beforeend",
            `
              <div class="message-item ${
                message.userId === userId ? "mine" : ""
              }">
                ${message.text} <sub>by ${message.username}</sub>
              </div>
            `
          );
        });
      });
  }

  loadMessages();

  sendMessageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    username = userNameInput.value.trim();
    const text = messageText.value.trim();
    if (text && username) {
      sendMessageForm.messageText.value = "";
      fetch(`/newMessage?username=${username}&text=${text}&userId=${userId}`)
        .then((response) => response.json())
        .then(loadMessages);
    }
  });

  setInterval(loadMessages, 1000);
});
