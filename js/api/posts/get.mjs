import { API_BASE, API_POSTS } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function getPosts() {
  try {
    const response = await authFetch(`${API_BASE}${API_POSTS}?_author=true`);

    if (!response.ok) {
      throw new Error("Failed to get posts");
    }

    const posts = await response.json();
    return posts.data;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
}