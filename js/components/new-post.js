import { NOROFF_API } from "./const/api.js";

const modalForm = document.getElementById("modalForm");
console.log(modalForm);

form.addEventListener("submit", newPost);

export async function newPost(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const loginCredentials = Object.fromEntries(formData.entries());
  //     console.log(loginCredentials);
  //     const message = document.getElementById("message");

  //     try {
  //       const response = await loginUser(loginCredentials);
  //       window.location.href = "/profile/";
  //     } catch (error) {
  //       message.innerHTML = error.message;
  //       message.setAttribute(
  //         "class",
  //         "text-danger d-flex justify-content-center mt-5"
  //       );
  //     }
}

//   async function loginUser(loginCredentials) {
//     const loginUrl = `${NOROFF_API}auth/login`;

//     const postOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(loginCredentials),
//     };

//     const response = await fetch(loginUrl, postOptions);
//     const json = await response.json();
//     const token = json.accessToken;
//     localStorage.setItem("token", token);

//     if (response.ok === true) {
//       return json;
//     }
//     throw new Error(json.errors[0].message);
//   }
