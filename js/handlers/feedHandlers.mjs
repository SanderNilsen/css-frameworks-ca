import { getPosts } from "../api/posts/get.mjs";
import { createPost } from "../api/posts/create.mjs";
import { renderPosts } from "../ui/renderPosts.mjs";
import { toggleLoader } from "../ui/loader.mjs";

let allPosts = [];
let displayedPosts = [];
let currentPage = 1;
const postsPerPage = 10;

export async function fetchPosts(loader, postsContainer, loadMoreButton) {
  try {
    toggleLoader(loader, true);
    allPosts = await getPosts();
    toggleLoader(loader, false);
    displayMore(postsContainer, loadMoreButton);
  } catch (error) {
    handleError(error, postsContainer, "Failed to load posts. Please try again later.");
  }
}

export function displayMore(container, loadMoreButton) {
  const startIndex = (currentPage - 1) * postsPerPage;
  const nextPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  if (nextPosts.length) {
    displayedPosts = displayedPosts.concat(nextPosts);
    renderPosts(displayedPosts, container);
    currentPage++;
  } else {
    loadMoreButton.style.display = "none"; // Hide the button if no more posts
  }
}

/**
 * Handles the creation of a new post.
 *
 * @async
 * @function handleCreatePost
 * @param {Event} event - The form submit event.
 * @param {HTMLElement} loader - The loader element to display during the operation.
 * @param {HTMLElement} postsContainer - The container where the posts are displayed.
 * @param {HTMLElement} loadMoreButton - The button to load more posts after a new post is created.
 * @param {HTMLFormElement} form - The form element containing post data.
 * 
 * @throws {Error} Will throw an error if the post creation fails.
 */

export async function handleCreatePost(event, loader, postsContainer, loadMoreButton, form) {
  event.preventDefault();
  const { value: title } = document.getElementById("postTitle");
  const { value: content } = document.getElementById("postContent");

  try {
    toggleLoader(loader, true);
    await createPost(title, content);
    await refreshPosts(postsContainer, loadMoreButton, form);
  } catch (error) {
    handleError(error, null, "Failed to create post. Please try again.");
  }
}

export function handleSearch(event, postsContainer) {
  const query = event.target.value.trim().toLowerCase();
  const filteredPosts = query
    ? allPosts.filter(({ title, body }) =>
      [title, body].some((text) => text.toLowerCase().includes(query))
    )
    : displayedPosts;

  renderPosts(filteredPosts, postsContainer);
}

async function refreshPosts(container, loadMoreButton, form) {
  allPosts = await getPosts();
  displayedPosts = [];
  currentPage = 1;
  displayMore(container, loadMoreButton);
  form.reset();
}

function handleError(error, container, message) {
  console.error(error);
  if (container) {
    container.innerHTML = `<p class="text-danger">${message}</p>`;
  }
  alert(message);
}
