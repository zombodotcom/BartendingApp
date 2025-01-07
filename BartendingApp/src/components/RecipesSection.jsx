// src/components/RecipesSection.jsx
import { h } from "preact";
import { CardGrid } from "./CardGrid.jsx";

/**
 * A specialized section for rendering recipes:
 *   { "Old Fashioned": { price: number, ingredients: {...} }, ... }
 *
 * Props:
 *  - recipesObj: Record<string, { price: number, ingredients: { [ingredient: string]: string } }>
 *  - bgClass: string (e.g. "bg-secondary text-white")
 *  - onAddToBill: Function to add a recipe to a bill
 */
export function RecipesSection({ recipesObj, bgClass, onAddToBill }) {
  const renderRecipeCard = (recipeName, recipeData) => (
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title d-flex justify-content-between align-items-center">
          {recipeName}
          {/* "Add to Bill" button with known price */}
          <button
            class="btn btn-sm btn-outline-primary"
            onClick={() => onAddToBill(recipeName, recipeData.price)}
          >
            Add to Bill
          </button>
        </h4>

        <ul class="list-group list-group-flush mt-3 mb-2">
          {Object.entries(recipeData.ingredients).map(
            ([ingredient, amount]) => (
              <li class="list-group-item" key={ingredient}>
                <strong>{ingredient}</strong>: {amount}
              </li>
            )
          )}
        </ul>
        <p>
          <strong>Price:</strong> ${recipeData.price.toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <section class={`p-3 mb-5 rounded ${bgClass}`}>
      <h2 class="mb-3">Recipes</h2>
      <CardGrid data={recipesObj} renderItem={renderRecipeCard} />
    </section>
  );
}
