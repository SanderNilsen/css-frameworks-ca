import { fetchPosts, displayMore, handleCreatePost, handleSearch } from "../handlers/feedHandlers.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  const createPostForm = document.getElementById("create-post-form");
  const searchInput = document.getElementById("search-input");
  const loadMoreButton = document.getElementById("load-more");
  const loader = document.getElementById("loader");

  // Initial fetch of posts
  fetchPosts(loader, postsContainer, loadMoreButton);

  // Event listeners
  createPostForm.addEventListener("submit", (event) =>
    handleCreatePost(event, loader, postsContainer, loadMoreButton, createPostForm)
  );

  searchInput.addEventListener("input", (event) =>
    handleSearch(event, postsContainer)
  );

  loadMoreButton.addEventListener("click", () => {
    displayMore(postsContainer, loadMoreButton);
  });
});
