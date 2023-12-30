/*import { NOROFF_API } from "./const/api.js";

export function postToFeed() {
  const modalForm = document.getElementById("modalForm");

  modalForm.addEventListener("submit", newPost);

  async function newPost(event) {
    event.preventDefault();

    const formContent = new FormData(modalForm);
    const newPostContent = Object.fromEntries(formContent.entries());

    try {
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
}*/
