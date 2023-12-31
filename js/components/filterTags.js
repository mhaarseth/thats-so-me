import { NOROFF_API } from "../const/api.js";

export async function filterTags() {

    try {
        const token = localStorage.getItem("token");
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const postsUrl = NOROFF_API + "posts" + "?_tags";
        const response = await fetch(postsUrl, fetchOptions);
        const json = await response.json();

        let tags = [];

        for (let i = 0; i < json.length; i++) {
            const lowerCaseTags = json[i].tags.map(tag => tag.toLowerCase());
            tags = tags.concat(lowerCaseTags);
        }

        const uniqueTags = [...new Set(tags)];
        const dropdownMenu = document.querySelector(".dropdown-menu");

        uniqueTags.forEach(tag => {
            const dropdownItem = document.createElement("li");
            dropdownItem.className = "dropdown-item";
            dropdownItem.textContent = tag;
            dropdownMenu.appendChild(dropdownItem);
        });

        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].addEventListener('click', function () {
                const tag = this.textContent;
                const dropdownButton = document.getElementById('dropdownMenuButton');
                dropdownButton.textContent = tag;

                if (tag === "No filter") {
                    location.reload();
                } if (tag === "No tags") {
                    const filteredPosts = json.filter(post => !post.tags || post.tags.length === 0);
                    console.log(filteredPosts);
                    const contentFeed = document.getElementById("content-feed");
                    contentFeed.innerHTML = "";
                    for (let i = 0; i < filteredPosts.length; i++) {
                        const postTitle = filteredPosts[i].title;
                        const postDate = filteredPosts[i].created;
                        const postText = filteredPosts[i].body;
                        // const id = json[i].id;

                        contentFeed.innerHTML += `
                        <div class="card mt-4">
                            <div class="card-body"><h6 class="card-subtitle mb-2 text-muted">${postDate}</h6>
                            <h5 class="card-title">${postTitle}</h5>
                            <p class="fs-6 fw-light fst-italic">#</p>
                                    <p class="card-text">
                                    ${postText}
                                    </p>
                                    <a href="#" class="card-link fw-semibold fs-4"
                  >View full post</a>
                            </div>
                            </div>
                        `;
                    }
                } else {
                    const filteredPosts = json.filter(post => post.tags.map(postTag => postTag.toLowerCase()).includes(tag));
                    const contentFeed = document.getElementById("content-feed");
                    contentFeed.innerHTML = "";
                    for (let i = 0; i < filteredPosts.length; i++) {
                        const postTitle = filteredPosts[i].title;
                        const postDate = filteredPosts[i].created;
                        const postText = filteredPosts[i].body;
                        const postTags = filteredPosts[i].tags.map(tag => tag.toLowerCase());
                        // const id = json[i].id;

                        contentFeed.innerHTML += `
                        <div class="card mt-4">
                            <div class="card-body"><h6 class="card-subtitle mb-2 text-muted">${postDate}</h6>
                            <h5 class="card-title">${postTitle}</h5>
                            <p class="fs-6 fw-light fst-italic">#${postTags}</p>
                                    <p class="card-text">
                                    ${postText}
                                    </p>
                                    <a href="#" class="card-link fw-semibold fs-4"
                  >View full post</a>
                            </div>
                            </div>
                        `;
                    }
                }
            });
        }
    } catch (error) {
        alert(error);
    }
};