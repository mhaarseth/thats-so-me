import { NOROFF_API } from "./const/api.js";

const modalForm = document.getElementById("modalForm");
// console.log(modalForm);

modalForm.addEventListener("submit", newPost);

async function newPost(event) {
  event.preventDefault();

  const formContent = new FormData(modalForm);
  console.log(formContent);
  const newPostContent = Object.fromEntries(formContent.entries());

  try {
    const response = await postNewPost(newPostContent);
    window.location.href = "/profile/";
  } catch (error) {
    alert(error);
  }
}

async function postNewPost(newPostContent) {
  const newPostUrl = `${NOROFF_API}posts/`;
  const token = localStorage.getItem("token");

  const newPostOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPostContent),
  };

  const response = await fetch(newPostUrl, newPostOptions);
  const json = await response.json();

  if (response.ok === true) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
