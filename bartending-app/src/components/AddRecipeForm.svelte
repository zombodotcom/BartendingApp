<!-- src/components/AddRecipeForm.svelte -->
<script>
  import {
    closeModalWindow,
    recipes,
    categories,
    units,
    alcohols,
    mixers,
    syrups,
    bitters,
    garnishes,
  } from "../stores.js";
  import { get } from "svelte/store";

  let name = "";
  let category = "";
  let description = "";
  let preparationTime = 0;
  let difficulty = "";
  let price = 0.0;
  let ingredients = [
    { type: "", id: "", quantity: "", unit: "", optional: false },
  ];
  let instructions = [""];

  const addIngredient = () => {
    ingredients.push({
      type: "",
      id: "",
      quantity: "",
      unit: "",
      optional: false,
    });
  };

  const removeIngredient = (index) => {
    ingredients.splice(index, 1);
  };

  const addInstruction = () => {
    instructions.push("");
  };

  const removeInstruction = (index) => {
    instructions.splice(index, 1);
  };

  const submitRecipe = () => {
    const newRecipe = {
      id: `recipe_${Date.now()}`,
      name,
      category,
      description,
      instructions,
      preparationTime,
      difficulty,
      price,
      ingredients,
      ratings: [],
    };
    recipes.update((current) => [...current, newRecipe]);
    closeModalWindow();
  };

  const getItems = (type) => {
    switch (type) {
      case "alcohol":
        return get(alcohols).map((a) => ({
          id: a.id,
          name: `${a.type} - ${a.brand}`,
        }));
      case "mixer":
        return get(mixers).map((m) => ({ id: m.id, name: m.name }));
      case "syrup":
        return get(syrups).map((s) => ({ id: s.id, name: s.name }));
      case "bitters":
        return get(bitters).map((b) => ({ id: b.id, name: b.name }));
      case "garnish":
        return get(garnishes).map((g) => ({ id: g.id, name: g.name }));
      default:
        return [];
    }
  };
</script>

<div>
  <h3>Add Recipe</h3>
  <div class="form-group">
    <label for="name">Name</label>
    <input id="name" type="text" bind:value={name} />
  </div>
  <div class="form-group">
    <label for="category">Category</label>
    <select id="category" bind:value={category}>
      <option value="">Select Category</option>
      {#each $categories as cat}
        <option value={cat.name}>{cat.name}</option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" bind:value={description}></textarea>
  </div>
  <div class="form-group">
    <label for="preparationTime">Preparation Time (minutes)</label>
    <input id="preparationTime" type="number" bind:value={preparationTime} />
  </div>
  <div class="form-group">
    <label for="difficulty">Difficulty</label>
    <select id="difficulty" bind:value={difficulty}>
      <option value="">Select Difficulty</option>
      <option value="Easy">Easy</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>
  <div class="form-group">
    <label for="price">Price ($)</label>
    <input id="price" type="number" step="0.01" bind:value={price} />
  </div>
  <h4>Ingredients</h4>
  {#each ingredients as ingredient, index}
    <div class="form-group">
      <label>Ingredient {index + 1}</label>
      <select bind:value={ingredient.type}>
        <option value="">Select Type</option>
        <option value="alcohol">Alcohol</option>
        <option value="mixer">Mixer</option>
        <option value="syrup">Syrup</option>
        <option value="bitters">Bitters</option>
        <option value="garnish">Garnish</option>
      </select>
      {#if ingredient.type}
        <select bind:value={ingredient.id}>
          <option value="">Select Item</option>
          {#each getItems(ingredient.type) as item}
            <option value={item.id}>{item.name}</option>
          {/each}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          bind:value={ingredient.quantity}
        />
        <select bind:value={ingredient.unit}>
          <option value="">Select Unit</option>
          {#each $units as unit}
            <option value={unit.abbreviation}>{unit.abbreviation}</option>
          {/each}
        </select>
        <label>
          <input type="checkbox" bind:checked={ingredient.optional} />
          Optional
        </label>
        <button on:click={() => removeIngredient(index)}>Remove</button>
      {/if}
    </div>
  {/each}
  <button on:click={addIngredient}>Add Ingredient</button>

  <h4>Instructions</h4>
  {#each instructions as instruction, index}
    <div class="form-group">
      <label>Step {index + 1}</label>
      <textarea bind:value={instruction}></textarea>
      <button on:click={() => removeInstruction(index)}>Remove</button>
    </div>
  {/each}
  <button on:click={addInstruction}>Add Instruction</button>

  <button on:click={submitRecipe}>Submit Recipe</button>
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
    margin-top: 1rem;
    margin-right: 0.5rem;
  }
</style>
