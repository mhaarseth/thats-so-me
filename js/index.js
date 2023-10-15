import { NOROFF_API } from "../js/const/api.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const loginCredentials = Object.fromEntries(formData.entries());
  const message = document.getElementById("message");

  try {
    const response = await loginUser(loginCredentials);
    window.location.href = "/profile/";
  } catch (error) {
    message.innerHTML = error.message;
    message.setAttribute(
      "class",
      "text-danger d-flex justify-content-center mt-5"
    );
  }
});

/**
 * Sends a request to the server to log in the user with the provided credentials.
 * @param {Object} loginCredentials - The login credentials.
 * @param {string} username - The username for login.
 * @param {string} password - The password for login.
 */

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
  const name = json.name;
  localStorage.setItem("name", name);

  if (response.ok === true) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
