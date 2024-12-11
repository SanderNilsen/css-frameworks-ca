import { getPosts } from "./api/posts/get.mjs";
import { createPost } from "./api/posts/create.mjs";
import { renderPosts } from "./ui/renderPosts.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const postsContainer = document.getElementById("posts-container");
  const createPostForm = document.getElementById("create-post-form");
  const searchInput = document.getElementById("search-input");
  const loader = document.getElementById("loader");

  let allPosts = [];

  // Function to toggle loader visibility
  const toggleLoader = (isVisible) => {
    loader.style.display = isVisible ? "block" : "none";
  };

  // Get and render posts on feed-page
  try {
    toggleLoader(true); // Show loader
    allPosts = await getPosts(); 
    toggleLoader(false); // Hide loader
    renderPosts(allPosts, postsContainer); 
  } catch (error) {
    toggleLoader(false); // Hide loader (in case of an error)
    console.error("Error fetching posts:", error);
    postsContainer.innerHTML = `<p class="text-danger">Failed to load posts. Please try again later.</p>`;
  }

  // Post creation
  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    try {
      toggleLoader(true); // Show loader
      await createPost(title, content);
      allPosts = await getPosts(); 
      toggleLoader(false); // Hide loader
      renderPosts(allPosts, postsContainer);
      createPostForm.reset();
    } catch (error) {
      toggleLoader(false); // Hide loader (in case of an error)
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
