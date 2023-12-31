import { NOROFF_API } from "../const/api.js";

/**
 * Edits a chosen post.
 * @param {Promise<string[]>} data The data of the post to be edited.
 * @param {number} id Id of post to be edited.
 * @example
 * ```js
 * //This function is called when the user clicks the edit button on their own posts on their profile page. 
 * //The first argument is specifiying which of the arrays' data to fetch when pressing the edit button, to populate the title and text fields of the edit modal.
 * //The second argument specifies which post to edit.
 * editPost(json[i], 1234)
 * 
 * ```
 */

export function editPost(json, id) {

    const editModalTitle = document.getElementById("editPostTitle");
    editModalTitle.value = json.title;

    const editModalBody = document.getElementById("editPostTextArea")
    editModalBody.value = json.body;

    editModalForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editPostUrl = `${NOROFF_API}posts/${id}`;
        const token = localStorage.getItem("token");

        const formContent = new FormData(editModalForm);
        const editedPostContent = Object.fromEntries(formContent.entries());

        const editPostOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editedPostContent),
        };

        const response = await fetch(editPostUrl, editPostOptions);

        if (response.ok === true) {
            location.reload();
        }
    })
}