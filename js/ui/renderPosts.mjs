import { updatePost } from "../api/posts/update.mjs";
import { deletePost } from "../api/posts/delete.mjs";

export function renderPosts(posts) {
  const postsContainer = document.getElementById("posts-container");

  if (!posts || posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts to display</p>";
    return;
  }

  postsContainer.innerHTML = posts
    .map(
      (post) => `
      <div class="card mb-3" data-post-id="${post.id}">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <div>
            <button class="btn btn-sm btn-primary">
              <i class="bi bi-hand-thumbs-up-fill"></i> Like
            </button>
            <button class="btn btn-sm btn-secondary">
              <i class="bi bi-chat-left-fill"></i> Comment
            </button>
            <button class="btn btn-sm btn-success">
              <i class="bi bi-share-fill"></i> Share
            </button> 
            <button class="btn btn-warning btn-sm edit-post">Edit
            </button>
            <button class="btn btn-danger btn-sm delete-post">Delete
            </button>
          </div>
        </div>
      </div>
    `
    )
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
