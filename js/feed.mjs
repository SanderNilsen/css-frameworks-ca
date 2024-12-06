import { getPosts } from "./api/posts/get.mjs";
import { createPost } from "./api/posts/create.mjs";
import { renderPosts } from "./ui/renderPosts.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("posts-container");
  const createPostForm = document.getElementById("create-post-form");
  const searchInput = document.getElementById("search-input");

  let allPosts = [];

  // Get and render posts on feed-page
  try {
    allPosts = await getPosts(); 
    renderPosts(allPosts, postsContainer); 
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
      allPosts = await getPosts(); 
      renderPosts(allPosts, postsContainer);
      createPostForm.reset();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  });

  // Search functionality
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase(); 
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
    renderPosts(filteredPosts, postsContainer);
  });
});
