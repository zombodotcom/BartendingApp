<!-- src/components/Favorites.svelte -->
<script>
  import { users, recipes } from "../stores.js";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { openModalWindow } from "../stores.js";

  let currentUser = null;
  let favoriteRecipes = [];

  onMount(() => {
    const allUsers = get(users);
    // Simulate getting the first user as the logged-in user
    currentUser = allUsers[0];
    favoriteRecipes = currentUser.favorites.recipes;
  });

  const isFavorite = (recipeId) => favoriteRecipes.includes(recipeId);

  const toggleFavorite = (recipeId) => {
    if (isFavorite(recipeId)) {
      // Remove from favorites
      users.update((n) =>
        n.map((u) => {
          if (u.id === currentUser.id) {
            return {
              ...u,
              favorites: {
                ...u.favorites,
                recipes: u.favorites.recipes.filter((id) => id !== recipeId),
              },
            };
          }
          return u;
        })
      );
      favoriteRecipes = favoriteRecipes.filter((id) => id !== recipeId);
    } else {
      // Add to favorites
      users.update((n) =>
        n.map((u) => {
          if (u.id === currentUser.id) {
            return {
              ...u,
              favorites: {
                ...u.favorites,
                recipes: [...u.favorites.recipes, recipeId],
              },
            };
          }
          return u;
        })
      );
      favoriteRecipes = [...favoriteRecipes, recipeId];
    }
  };
</script>

<div class="favorites-container">
  <h2>Favorite Recipes</h2>
  {#if favoriteRecipes.length === 0}
    <p>You have no favorite recipes.</p>
  {:else}
    <ul>
      {#each favoriteRecipes as recipeId}
        {#if $recipes.find((r) => r.id === recipeId)}
          <li class="favorite-item">
            {$recipes.find((r) => r.id === recipeId).name}
            <button
              on:click={() => toggleFavorite(recipeId)}
              class={isFavorite(recipeId) ? "favorited" : "not-favorited"}
              aria-label={isFavorite(recipeId)
                ? "Remove from favorites"
                : "Add to favorites"}
            >
              {isFavorite(recipeId) ? "❤️" : "🤍"}
            </button>
          </li>
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style>
  .favorites-container {
    padding: 1rem;
  }
  .favorite-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
  }
  .favorited {
    color: #f44336;
  }
  .not-favorited {
    color: #ccc;
  }
</style>
