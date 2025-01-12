import { API_BASE, API_POSTS } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function createPost(title, content) {
  const response = await authFetch(API_BASE + API_POSTS, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: content,
    }),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed to create post");
}
