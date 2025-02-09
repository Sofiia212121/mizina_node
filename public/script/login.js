const API_URL = "http://localhost:3000/api/login";
const $loginForm = document.querySelector("#loginForm");
const $userName = document.querySelector("#userName");
const $userPass = document.querySelector("#userPass");

$loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = $userName.value;
  const userPass = $userPass.value;

  if (!userName || !userPass) {
    alert("Enter name and password.");
    return;
  }

  const url = `${API_URL}?userName=${userName}&userPass=${userPass}`;

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.success) {
        window.location.href = "welcome.html";
      } else {
        alert("Incorrect login or password.");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Login error. Please try again.");
    });
});
