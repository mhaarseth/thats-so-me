import { NOROFF_API } from "../const/api.js";

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