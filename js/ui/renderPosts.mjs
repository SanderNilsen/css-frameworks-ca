import { updatePost } from "../api/posts/update.mjs";
import { deletePost } from "../api/posts/delete.mjs";

export function renderPosts(posts) {
  const postsContainer = document.getElementById("posts-container");

  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts to display</p>";
    return;
  }

  postsContainer.innerHTML = posts
    .map(({ id, title, body, created, media, updated, author }) => {
      const authorName = author?.name || "Anonymous";
      const authorAvatar = author?.avatar?.url || "";

      return `
      <div class="card mb-3 shadow-sm" data-post-id="${id}">
        <div class="card-header d-flex justify-content-between">
          <span class="d-flex align-items-center">
            ${authorAvatar ? `<img src="${authorAvatar}" alt="${authorName}'s Avatar" class="avatar me-2">` : ""}
            <strong>${authorName}</strong>
            <small class="text-muted ms-2">${new Date(created).toLocaleString()}</small>
          </span>
          <span>
            <button class="btn btn-warning btn-sm edit-post"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger btn-sm delete-post"><i class="bi bi-trash-fill"></i></button>
          </span> 
        </div>
        <div class="card-body">
          ${media?.url ? `<img src="${media.url}" class="card-img-top mb-2" alt="${media.alt}" />` : ""}
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${body}</p>
        </div>
        <small class="card-footer text-muted">
          Last updated: ${new Date(updated).toLocaleString()}
        </small>
      </div>
      `;
    })
    .join("");

  // Event listeners for edit and delete buttons
  postsContainer.querySelectorAll(".edit-post").forEach((button) =>
    button.addEventListener("click", (e) => handleEditPost(e, posts))
  );

  postsContainer.querySelectorAll(".delete-post").forEach((button) =>
    button.addEventListener("click", (e) => handleDeletePost(e))
  );
}

// Function editing a post (Note to self: Make more user-friendly)
async function handleEditPost(event, posts) {
  const postId = event.target.closest(".card").dataset.postId;
  const post = posts.find((p) => p.id == postId);

  const newTitle = prompt("Enter new title", post.title);
  const newBody = prompt("Enter new body", post.body);

  if (newTitle && newBody) {
    try {
      await updatePost(postId, { title: newTitle, body: newBody });
      alert("Post updated successfully!");
      location.reload();
    } catch (error) {
      alert("Failed to update the post");
    }
  }
}

// Function deleting a post
async function handleDeletePost(event) {
  const postId = event.target.closest(".card").dataset.postId;

  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
    try {
      await deletePost(postId);
      alert("Post deleted successfully!");
      location.reload();
    } catch (error) {
      alert("Failed to delete the post");
    }
  }
}
