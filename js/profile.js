import { NOROFF_API } from "./const/api.js";

async function getPosts(url) {
  try {
    console.log(url);

    const token = localStorage.getItem("token");
    console.log(token);

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const postsUrl = `${NOROFF_API}posts`;

getPosts(postsUrl);
