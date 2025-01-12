import { API_BASE, API_POSTS } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function updatePost(postId, updatedPost) {
  try {
    const response = await authFetch(`${API_BASE + API_POSTS}/${postId}`, {
      method: "PUT",
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update the post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
