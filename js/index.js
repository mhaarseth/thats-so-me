import { NOROFF_API } from "../js/const/api.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", getToken);

async function getToken(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const loginCredentials = Object.fromEntries(formData.entries());
  const message = document.getElementById("message");

  try {
    const response = await loginUser(loginCredentials);
  } catch (error) {
    console.log(error.message);
    message.innerHTML = error.message;
    message.setAttribute(
      "class",
      "text-danger d-flex justify-content-center mt-5"
    );
  }
}

async function loginUser(loginCredentials) {
  const loginUrl = `${NOROFF_API}auth/login`;

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  };

  const response = await fetch(loginUrl, postOptions);
  const json = await response.json();
  const token = json.accessToken;

  localStorage.setItem("token", token);

  if (response.ok === true) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
