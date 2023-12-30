import { NOROFF_API } from "./const/api.js";

async function singlePost() {
    try {
        const token = localStorage.getItem("token");
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        const postsUrl = NOROFF_API + "posts/" + id + "?_author=true&_comments=true&_reactions=true";
        const response = await fetch(postsUrl, fetchOptions);
        const json = await response.json();

        const postTitle = json.title;
        const postMedia = json.media;
        const postBody = json.body;
        const postTags = json.tags;
        const postAuthor = json.author.name
        const singlePostContent = document.getElementById("single-post-content")

        singlePostContent.innerHTML = `
        <div class="card mb-3 mt-2 col-12">
            <img src="${postMedia}" class="card-img-top mx-auto d-block w-100" alt="">
            <div class="card-body">
            
                <h5 class="card-title fw-bold">${postTitle}</h5>
                <p class="card-text">Written by ${postAuthor}</p>
                <p class="card-text">${postBody}</p>
                <p class="card-text"><small class="text-body-secondary fw-light fst-italic">#${postTags}</small></p>
            </div>
        </div>

        `

    } catch (error) {
        alert(error);
    }
}

singlePost();