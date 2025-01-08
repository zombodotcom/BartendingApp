<!-- src/components/Recipes.svelte -->
<script>
  import { recipes, openModalWindow } from "../stores.js";
  import {
    alcohols,
    mixers,
    syrups,
    bitters,
    garnishes,
    users,
  } from "../stores.js";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  let currentRecipes = [];

  const unsubscribe = recipes.subscribe((value) => {
    currentRecipes = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });

  const deleteRecipe = (id) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      recipes.update((currentData) =>
        currentData.filter((recipe) => recipe.id !== id)
      );
    }
  };

  const editRecipe = (id) => {
    openModalWindow("edit-recipe", id);
  };

  const addRecipe = () => {
    openModalWindow("add-recipe");
  };

  const getAlcoholName = (id) => {
    const currentAlcohols = get(alcohols);
    const alcohol = currentAlcohols.find((a) => a.id === id);
    return alcohol ? `${alcohol.type} - ${alcohol.brand}` : "Unknown Alcohol";
  };

  const getItemName = (id) => {
    const allItems = [
      ...get(mixers),
      ...get(syrups),
      ...get(bitters),
      ...get(garnishes),
    ];
    const item = allItems.find((i) => i.id === id);
    return item ? item.name : "Unknown Item";
  };

  const getUsername = (userId) => {
    const currentUsers = get(users);
    const user = currentUsers.find((u) => u.id === userId);
    return user ? user.username : "Anonymous";
  };
</script>

<div class="recipes-container">
  <h2>Recipes</h2>
  <button class="add-btn" on:click={addRecipe}>Add Recipe</button>
  {#each currentRecipes as recipe}
    <div class="recipe-card">
      <div class="recipe-header">
        <h3>{recipe.name} (${recipe.price.toFixed(2)})</h3>
        <div class="recipe-actions">
          <button class="edit-btn" on:click={() => editRecipe(recipe.id)}
            >Edit</button
          >
          <button class="delete-btn" on:click={() => deleteRecipe(recipe.id)}
            >Delete</button
          >
        </div>
      </div>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Preparation Time:</strong> {recipe.preparationTime} minutes</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <h4>Ingredients:</h4>
      <ul>
        {#each recipe.ingredients as ingredient}
          <li>
            {ingredient.quantity}
            {ingredient.unit} - {ingredient.type === "alcohol"
              ? getAlcoholName(ingredient.id)
              : getItemName(ingredient.id)}
            {ingredient.optional ? " (Optional)" : ""}
          </li>
        {/each}
      </ul>
      <h4>Instructions:</h4>
      <ol>
        {#each recipe.instructions as step}
          <li>{step}</li>
        {/each}
      </ol>
      <h4>Ratings:</h4>
      <ul>
        {#each recipe.ratings as rating}
          <li>
            <strong>{getUsername(rating.userId)}</strong> rated it {rating.rating}/5
            <p>{rating.comment}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .recipes-container {
    padding: 1rem;
  }
  .recipe-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .recipe-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .recipe-actions button {
    margin-left: 0.5rem;
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .edit-btn {
    background-color: #008cba;
    color: white;
  }
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  .add-btn {
    background-color: #4caf50;
    color: white;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
