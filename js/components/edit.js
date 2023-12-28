import { NOROFF_API } from "../const/api.js";

export function editPost(json, id) {
    console.log(json)
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
        //const json = await response.json();

        if (response.ok === true) {
            location.reload();
        }
    })
}