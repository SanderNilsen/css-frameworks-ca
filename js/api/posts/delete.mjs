import { API_BASE, API_POSTS } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function deletePost(postId) {
  try {
    const response = await authFetch(`${API_BASE + API_POSTS}/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the post");
    }

    return true; // Return true if deletion is successful
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
