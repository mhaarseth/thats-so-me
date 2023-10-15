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

    for (let i = 0; i < json.length; i++) {
      const contentFeed = document.getElementById("content-feed");
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

const postsUrl = `${NOROFF_API}posts`;

getPosts(postsUrl);

{
  /* <h5 class="card-title post-title">Title of post</h5>
                <h6 class="card-subtitle mb-2 text-muted post-date">28.02.1983</h6>
                <p class="card-text post-content">
                  Clever pun or text, maybe a commentary on current events.
                </p>
                <a href="#" class="card-link"
                  ><img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    class="rounded-circle"
                /></a> */
}
