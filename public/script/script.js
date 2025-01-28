const API_URL = "http://localhost:3000/api/someData";
const form = document.querySelector("#form");
const result = document.querySelector("#result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const num1 = form.querySelector("#num1").value;
  const num2 = form.querySelector("#num2").value;

  if (num1 !== "" && num2 !== "") {
    const url = `${API_URL}?num1=${num1}&num2=${num2}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.result) {
          result.textContent = data.result;
        } else {
          result.textContent = "No valid result returned";
        }
      })
      .catch((error) => {
        result.textContent = "Error fetching data";
      });
  } else {
    result.textContent = "Please enter valid numbers";
  }
});
