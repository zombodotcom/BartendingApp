// src/components/ManageRecipesSection.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

/**
 * A component to manage recipes:
 *  - Display existing recipes with their ingredients
 *  - Add new recipes
 *  - Remove selected recipes
 *  - Add/remove ingredients within each recipe
 *
 * Props:
 *  - recipes: Record<string, { price: number, ingredients: { [ingredient: string]: string } }>
 *  - addNewRecipe: Function to add a new recipe
 *  - removeRecipe: Function to remove a recipe by name
 *  - updateRecipeIngredients: Function to update ingredients of a recipe
 *  - bgClass: string for styling
 */
export function ManageRecipesSection({
  recipes,
  addNewRecipe,
  removeRecipe,
  updateRecipeIngredients,
  bgClass,
}) {
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipePrice, setNewRecipePrice] = useState("");

  // Handle form submission for adding a new recipe
  function handleAddRecipe(e) {
    e.preventDefault();
    if (!newRecipeName.trim()) {
      alert("Recipe name cannot be empty.");
      return;
    }
    if (recipes.hasOwnProperty(newRecipeName.trim())) {
      alert("Recipe already exists.");
      return;
    }
    if (isNaN(parseFloat(newRecipePrice))) {
      alert("Please enter a valid price.");
      return;
    }
    addNewRecipe(newRecipeName.trim(), parseFloat(newRecipePrice));
    setNewRecipeName("");
    setNewRecipePrice("");
  }

  // Handle removal of selected recipe
  function handleRemoveRecipe(recipeName) {
    if (
      window.confirm(
        `Are you sure you want to remove the recipe "${recipeName}"? This action cannot be undone.`
      )
    ) {
      removeRecipe(recipeName);
    }
  }

  // Handle adding a new ingredient to a recipe
  function handleAddIngredient(
    recipeName,
    ingredientName,
    ingredientAmount,
    resetFields
  ) {
    if (!ingredientName.trim()) {
      alert("Ingredient name cannot be empty.");
      return;
    }
    if (!ingredientAmount.trim()) {
      alert("Ingredient amount cannot be empty.");
      return;
    }
    updateRecipeIngredients(
      recipeName,
      ingredientName.trim(),
      ingredientAmount.trim(),
      "add"
    );
    resetFields();
  }

  // Handle removing an ingredient from a recipe
  function handleRemoveIngredient(recipeName, ingredientName) {
    if (
      window.confirm(
        `Are you sure you want to remove the ingredient "${ingredientName}" from recipe "${recipeName}"?`
      )
    ) {
      updateRecipeIngredients(recipeName, ingredientName, null, "remove");
    }
  }

  return (
    <section class={`p-3 mb-5 rounded ${bgClass}`}>
      <h2 class="mb-3">Manage Recipes</h2>

      {/* Existing Recipes List */}
      <div class="mb-4">
        <h4>Existing Recipes:</h4>
        {Object.keys(recipes).length === 0 ? (
          <p>No recipes available.</p>
        ) : (
          Object.entries(recipes).map(([recipeName, recipeData]) => (
            <div key={recipeName} class="card mb-3">
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{recipeName}</strong> - $
                    {recipeData.price.toFixed(2)}
                  </span>
                  <button
                    class="btn btn-sm btn-danger"
                    onClick={() => handleRemoveRecipe(recipeName)}
                  >
                    Remove Recipe
                  </button>
                </h5>
                <div class="mt-3">
                  <h6>Ingredients:</h6>
                  {Object.keys(recipeData.ingredients).length === 0 ? (
                    <p>No ingredients added yet.</p>
                  ) : (
                    <ul class="list-group mb-3">
                      {Object.entries(recipeData.ingredients).map(
                        ([ingredientName, ingredientAmount]) => (
                          <li
                            key={ingredientName}
                            class="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span>
                              {ingredientName} - {ingredientAmount}
                            </span>
                            <button
                              class="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleRemoveIngredient(
                                  recipeName,
                                  ingredientName
                                )
                              }
                            >
                              Remove
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                  {/* Add Ingredient Form */}
                  <AddIngredientForm
                    recipeName={recipeName}
                    onAddIngredient={handleAddIngredient}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Recipe Form */}
      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-3">Add New Recipe</h4>
          <form onSubmit={handleAddRecipe} class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Recipe Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Margarita"
                value={newRecipeName}
                onInput={(e) => setNewRecipeName(e.target.value)}
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                class="form-control"
                placeholder="e.g. 10.00"
                value={newRecipePrice}
                onInput={(e) => setNewRecipePrice(e.target.value)}
                required
              />
            </div>
            <div class="col-md-2 align-self-end">
              <button type="submit" class="btn btn-success w-100">
                Add Recipe
              </button>
            </div>
          </form>
          <p class="mt-2 text-muted">
            (Ingredients can be edited in a more advanced UI later.)
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * A sub-component to handle adding ingredients to a recipe.
 *
 * Props:
 *  - recipeName: string
 *  - onAddIngredient: Function to add an ingredient
 */
function AddIngredientForm({ recipeName, onAddIngredient }) {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  // Reset input fields after adding
  function resetFields() {
    setIngredientName("");
    setIngredientAmount("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddIngredient(recipeName, ingredientName, ingredientAmount, resetFields);
  }

  return (
    <form onSubmit={handleSubmit} class="row g-2">
      <div class="col-md-5">
        <input
          type="text"
          class="form-control"
          placeholder="Ingredient Name"
          value={ingredientName}
          onInput={(e) => setIngredientName(e.target.value)}
          required
        />
      </div>
      <div class="col-md-5">
        <input
          type="text"
          class="form-control"
          placeholder="Amount (e.g., 2 oz)"
          value={ingredientAmount}
          onInput={(e) => setIngredientAmount(e.target.value)}
          required
        />
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary w-100">
          Add
        </button>
      </div>
    </form>
  );
}
