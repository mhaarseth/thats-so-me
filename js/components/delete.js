import { NOROFF_API } from "../const/api.js";

/**
 * Deletes a chosen post.
 * @param {number} id Id of post to be deleted, fetched from the API.
 * If response is ok, automatically reloads page to update list of posts.
 * @example
 * ```js
 * //This function is called when the logged in user clicks the delete button on their own posts on the profile page.
 * deletePost(1234);
 * ```
 */

export async function deletePost(id) {
    try {
        const token = localStorage.getItem("token");
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        };

        const postsUrl = NOROFF_API + "posts/" + id;
        const response = await fetch(postsUrl, fetchOptions);

        if (response.json()) {
            location.reload();
        }

    } catch (error) {
        alert(error);
    }

}
