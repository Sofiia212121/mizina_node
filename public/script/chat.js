const $chatForm = document.querySelector("#chat-form");
const $message = $chatForm.querySelector("#message");
const $chatMessages = $chatForm.querySelector("#chat-messages");

$chatForm.addEventListener("submit", (e) => {
  e.preventDefault;

  const message = $message.value;
  if (message) {
    $message.value = "";
    fetch(`/chatAPI/sendMassage?message=${message}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        $chatMessages.innerHTML = "";

        data.forEach((msg) => {
          const messageElem = document.createElement("p");
          messageElem.classList.add("chat-message");
          messageElem.textContent = `${msg.message} at ${msg.time}`;
          $chatMessages.appendChild(messageElem);
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Something went wrong. Please try again.";
        $chatMessages.appendChild(errorMessage);
      });
  }
});
