// src/components/orders/AddOrderForm.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

export default function AddOrderForm({ recipes, addOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleAddRecipe = () => {
    setSelectedRecipes([...selectedRecipes, { recipeName: "", quantity: 1 }]);
  };

  const handleRecipeChange = (index, field, value) => {
    const updatedRecipes = selectedRecipes.map((recipe, idx) =>
      idx === index ? { ...recipe, [field]: value } : recipe
    );
    setSelectedRecipes(updatedRecipes);
  };

  const handleRemoveRecipe = (index) => {
    const updatedRecipes = selectedRecipes.filter((_, idx) => idx !== index);
    setSelectedRecipes(updatedRecipes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Customer name is required.");
      return;
    }
    if (selectedRecipes.length === 0) {
      alert("Please add at least one recipe to the order.");
      return;
    }

    // Calculate total prices
    const items = selectedRecipes.map((recipe) => {
      const recipeDetails = recipes[recipe.recipeName];
      return {
        recipeName: recipe.recipeName,
        quantity: Number(recipe.quantity),
        price: recipeDetails.price,
        totalPrice: recipeDetails.price * Number(recipe.quantity),
      };
    });

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    addOrder({ customerName, items, total });
    setCustomerName("");
    setSelectedRecipes([]);
  };

  return (
    <form class="border rounded-lg p-4 bg-gray-50" onSubmit={handleSubmit}>
      <h3 class="text-lg font-semibold mb-4">Create New Order</h3>
      <div class="mb-4">
        <label
          for="customerName"
          class="block text-sm font-medium text-gray-700"
        >
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={customerName}
          onInput={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <h4 class="text-md font-semibold mb-2">Items</h4>
        {selectedRecipes.map((recipe, index) => (
          <div key={index} class="flex items-center mb-2">
            <select
              class="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
              value={recipe.recipeName}
              onChange={(e) =>
                handleRecipeChange(index, "recipeName", e.target.value)
              }
              required
            >
              <option value="">Select Recipe</option>
              {Object.keys(recipes).map((recipeName) => (
                <option key={recipeName} value={recipeName}>
                  {recipeName} - ${recipes[recipeName].price.toFixed(2)}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              class="border border-gray-300 rounded-md p-2 w-20 mr-2"
              value={recipe.quantity}
              onInput={(e) =>
                handleRecipeChange(index, "quantity", e.target.value)
              }
              required
            />
            <button
              type="button"
              class="btn btn-outline-danger text-red-700"
              onClick={() => handleRemoveRecipe(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          class="btn btn-outline-primary text-blue-700 mt-2"
          onClick={handleAddRecipe}
        >
          Add Recipe
        </button>
      </div>
      <button type="submit" class="btn btn-primary text-white">
        Submit Order
      </button>
    </form>
  );
}
