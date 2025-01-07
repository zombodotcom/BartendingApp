// src/components/RecipeEditor.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

/**
 * Props:
 *  - recipes: { [name: string]: { price: number; ingredients: Record<string,string> } }
 *  - onAddRecipe(name: string, price: number): void
 *  - onRemoveRecipe(name: string): void
 */
export function RecipeEditor({ recipes, onAddRecipe, onRemoveRecipe }) {
  const recipeNames = Object.keys(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(recipeNames[0] || "");
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newRecipePrice, setNewRecipePrice] = useState("");

  const handleRemoveSelected = () => {
    if (!selectedRecipe) return;
    onRemoveRecipe(selectedRecipe);
    // pick a new selected if needed:
    const remaining = Object.keys(recipes).filter((r) => r !== selectedRecipe);
    setSelectedRecipe(remaining[0] || "");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newRecipeName.trim()) return;
    onAddRecipe(newRecipeName.trim(), parseFloat(newRecipePrice) || 0);
    setNewRecipeName("");
    setNewRecipePrice("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Recipes</h3>

      {/* Remove existing recipe */}
      <label style={{ display: "inline-block", marginBottom: "0.5rem" }}>
        Existing Recipes:
        <select
          value={selectedRecipe}
          onChange={(e) => setSelectedRecipe(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          {recipeNames.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      {selectedRecipe && (
        <button style={{ marginLeft: "1rem" }} onClick={handleRemoveSelected}>
          Remove Selected Recipe
        </button>
      )}

      {/* Add new recipe */}
      <form onSubmit={handleAdd} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipeName}
          onInput={(e) => setNewRecipeName(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newRecipePrice}
          onInput={(e) => setNewRecipePrice(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Add New Recipe</button>
      </form>
      <p style={{ fontStyle: "italic", marginTop: "0.5rem" }}>
        (Ingredients can be edited in a more advanced UI later.)
      </p>
    </div>
  );
}
