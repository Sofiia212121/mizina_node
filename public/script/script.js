const API_URL = "http://localhost:3000/api/quadraticEquation";
const form = document.querySelector("#form");
const result = document.querySelector("#result");
const preloader = document.querySelector("#preloader");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const a = form.querySelector("#a").value;
  const b = form.querySelector("#b").value;
  const c = form.querySelector("#c").value;

  if (a !== "" && b !== "" && c !== "") {
    const url = `${API_URL}?a=${a}&b=${b}&c=${c}`;

    result.textContent = "";
    preloader.classList.remove("hidden");

    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.result) {
            result.textContent = `Discriminant: ${data.discriminant}. Roots: ${data.result}`;
          } else {
            result.textContent = "No valid result returned";
          }
          preloader.classList.add("hidden");
        })
        .catch((error) => {
          result.textContent = "Error fetching data";
          preloader.classList.add("hidden");
        });
    }, 2000);
  } else {
    result.textContent = "Please enter valid numbers";
  }
});
