import { getPosts } from "./api/posts/get.mjs";
import { createPost } from "./api/posts/create.mjs";
import { renderPosts } from "./ui/renderPosts.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("posts-container");
  const createPostForm = document.getElementById("create-post-form");

  // Get and render posts on feed-page
  try {
    const posts = await getPosts();
    renderPosts(posts, postsContainer);
  } catch (error) {
    console.error("Error fetching posts:", error);
    postsContainer.innerHTML = `<p class="text-danger">Failed to load posts. Please try again later.</p>`;
  }

  // Post creation
  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    try {
      await createPost(title, content);
      const posts = await fetchPosts();
      renderPosts(posts, postsContainer); 
      createPostForm.reset();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
});
