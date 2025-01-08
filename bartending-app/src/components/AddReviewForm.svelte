<!-- src/components/AddReviewForm.svelte -->
<script>
  import { closeModalWindow, reviews, users } from "../stores.js";
  import { get } from "svelte/store";

  export let recipeId = "";

  let rating = 5;
  let comment = "";
  let userId = "user_1"; // Simulate logged-in user

  const submitReview = () => {
    if (rating && comment) {
      const newReview = {
        id: `review_${Date.now()}`,
        recipeId,
        userId,
        rating,
        comment,
        timestamp: new Date().toISOString(),
      };
      reviews.update((current) => [...current, newReview]);
      closeModalWindow();
    } else {
      alert("Please provide a rating and comment.");
    }
  };
</script>

<div>
  <h3>Add Review</h3>
  <div class="form-group">
    <label for="rating">Rating</label>
    <select id="rating" bind:value={rating}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>
  <div class="form-group">
    <label for="comment">Comment</label>
    <textarea id="comment" bind:value={comment}></textarea>
  </div>
  <button on:click={submitReview}>Submit Review</button>
</div>

<style>
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
