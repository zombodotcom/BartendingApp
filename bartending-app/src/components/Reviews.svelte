<!-- src/components/Reviews.svelte -->
<script>
  import { reviews, recipes, users, openModalWindow } from "../stores.js";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  export let recipeId = "";

  let currentReviews = [];
  let currentUser = null;

  onMount(() => {
    currentReviews = get(reviews).filter((r) => r.recipeId === recipeId);
    const allUsers = get(users);
    currentUser = allUsers[0]; // Simulate logged-in user
  });

  const submitReview = () => {
    openModalWindow("add-review", recipeId);
  };
  const getUsername = (userId) => {
    const currentUsers = get(users);
    const user = currentUsers.find((u) => u.id === userId);
    return user ? user.username : "Anonymous";
  };
</script>

<div class="reviews-container">
  <h4>Reviews</h4>
  {#if currentReviews.length === 0}
    <p>No reviews yet.</p>
  {:else}
    {#each currentReviews as review}
      <div class="review">
        <strong>{getUsername(review.userId)} rated it {review.rating}/5</strong>
        <p>{review.comment}</p>
        <small>{new Date(review.timestamp).toLocaleString()}</small>
      </div>
    {/each}
  {/if}
  <button class="submit-btn" on:click={submitReview}>Add Review</button>
</div>

<style>
  .reviews-container {
    padding: 1rem;
  }
  .review {
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
  }
  .review strong {
    display: block;
  }
  .submit-btn {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
</style>
