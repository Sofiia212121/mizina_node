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
        $chatMessages.append(data);
      });
  }
});
