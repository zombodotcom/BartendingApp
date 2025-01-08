<!-- src/components/Modal.svelte -->
<script>
  import { modalContent, closeModalWindow } from "../stores.js";
  import { get } from "svelte/store";
  import { onDestroy } from "svelte";
  import AddAlcoholForm from "./AddAlcoholForm.svelte";
  import EditAlcoholForm from "./EditAlcoholForm.svelte";
  import AddRecipeForm from "./AddRecipeForm.svelte";
  import EditRecipeForm from "./EditRecipeForm.svelte";
  import AddReviewForm from "./AddReviewForm.svelte";

  let mode = "";
  let id = null;

  const unsubscribe = modalContent.subscribe((value) => {
    mode = value.mode;
    id = value.id;
  });

  // Cleanup subscription on component destroy
  onDestroy(() => {
    unsubscribe();
  });

  const handleClose = () => {
    closeModalWindow();
  };
</script>

<div class="modal" role="dialog" aria-modal="true">
  <div class="modal-content">
    <button class="close-btn" on:click={handleClose} aria-label="Close Modal"
      >&times;</button
    >
    {#if mode === "add-alcohol"}
      <AddAlcoholForm />
    {:else if mode === "edit-alcohol"}
      <EditAlcoholForm {id} />
    {:else if mode === "add-recipe"}
      <AddRecipeForm />
    {:else if mode === "edit-recipe"}
      <EditRecipeForm {id} />
    {:else if mode === "add-review"}
      <AddReviewForm recipeId={id} />
    {/if}
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 500px;
    position: relative;
  }
  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
