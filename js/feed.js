import { NOROFF_API } from "./const/api.js";

async function getPosts(url) {
  try {
    const token = localStorage.getItem("token");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);

    const feed = document.querySelector("");
  } catch (error) {
    console.log(error);
  }
}

const postsUrl = `${NOROFF_API}posts`;

getPosts(postsUrl);
