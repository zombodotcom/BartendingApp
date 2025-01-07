// src/components/RecipesSection.jsx
import { h } from "preact";
import { CardGrid } from "./CardGrid.jsx";

export function RecipesSection({ recipesObj, bgClass, onAddToTab }) {
  const renderRecipeCard = (recipeName, recipeData) => (
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title d-flex justify-content-between">
          {recipeName}
          {/* "Add to Tab" button with known price */}
          <button
            class="btn btn-sm btn-outline-primary"
            onClick={() => onAddToTab(recipeName, recipeData.price)}
          >
            Add to Tab
          </button>
        </h4>

        <ul class="list-group list-group-flush mt-3 mb-2">
          {Object.entries(recipeData.ingredients).map(([ing, amt]) => (
            <li class="list-group-item" key={ing}>
              <strong>{ing}</strong>: {amt}
            </li>
          ))}
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
