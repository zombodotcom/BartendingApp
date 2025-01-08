<!-- src/components/AddAlcoholForm.svelte -->
<script>
  import { closeModalWindow, alcohols } from "../stores.js";
  import { onMount } from "svelte";

  let type = "";
  let category = "";
  let brand = "";
  let quantity = 0;
  let unit = "";
  let description = "";

  const addAlcohol = () => {
    if (type && category && brand && quantity && unit) {
      const newAlcohol = {
        id: `alcohol_${Date.now()}`,
        type,
        category,
        brand,
        quantity,
        unit,
        description,
      };
      alcohols.update((current) => [...current, newAlcohol]);
      closeModalWindow();
    } else {
      alert("Please fill in all required fields.");
    }
  };
</script>

<div>
  <h3>Add Alcohol</h3>
  <div class="form-group">
    <label for="type">Type</label>
    <input id="type" type="text" bind:value={type} />
  </div>
  <div class="form-group">
    <label for="category">Category</label>
    <input id="category" type="text" bind:value={category} />
  </div>
  <div class="form-group">
    <label for="brand">Brand</label>
    <input id="brand" type="text" bind:value={brand} />
  </div>
  <div class="form-group">
    <label for="quantity">Quantity</label>
    <input id="quantity" type="number" bind:value={quantity} min="0" />
  </div>
  <div class="form-group">
    <label for="unit">Unit</label>
    <input id="unit" type="text" bind:value={unit} />
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" bind:value={description}></textarea>
  </div>
  <button on:click={addAlcohol}>Add</button>
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
