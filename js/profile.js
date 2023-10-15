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

function setProfileName() {
  console.log("function running");
  const profileName = document.getElementById("profileName");
  const storedProfileName = localStorage.getItem("name");
  profileName.innerHTML = `${storedProfileName}`;
}

setProfileName();

async function showOwnPosts(url) {
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

    for (let i = 0; i < json.length; i++) {
      const contentFeed = document.querySelector(".ownContentFeed");
      console.log(contentFeed);
      const postTitle = json[i].title;
      const postDate = json[i].created;
      const postText = json[i].body;
      // const id = json[i].id;

      contentFeed.innerHTML += `
          <div class="card mt-4">
            <div class="card-body">
              <h5 class="card-title">${postTitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${postDate}</h6>
                    <p class="card-text">
                      ${postText}
                    </p>
                    <a href="#" class="card-link"
                      ><img
                        src="https://github.com/mdo.png"
                        alt="mdo"
                        width="32"
                        height="32"
                        class="rounded-circle"
                    /></a>
              </div>
            </div>
          `;
    }
  } catch (error) {
    console.log(error);
  }
}

const profileName = localStorage.getItem("name");
console.log(profileName);
const postsUrl = `${NOROFF_API}profiles/${profileName}/posts`;
showOwnPosts(postsUrl);
