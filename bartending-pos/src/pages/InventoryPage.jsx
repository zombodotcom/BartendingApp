// src/pages/InventoryPage.jsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { ToastContext } from "../context/ToastContext.jsx";
import { useContext } from "preact/hooks";

export default function InventoryPage({ barData, setBarData }) {
  const { showToast } = useContext(ToastContext);
  const [inventory, setInventory] = useState(barData.inventory || {});

  const handleUpdateInventory = (ingredient, quantity) => {
    const updatedInventory = {
      ...inventory,
      [ingredient]: quantity,
    };
    setInventory(updatedInventory);
    setBarData({ ...barData, inventory: updatedInventory });
    showToast("Success", `Inventory updated for ${ingredient}.`, 3000);
  };

  return (
    <div>
      <h2 class="text-2xl font-semibold mb-4">Inventory Management</h2>
      {/* Implement your inventory management UI here */}
      <p>This is a placeholder for the Inventory Management component.</p>
      {/* Example: List of ingredients with update options */}
      <ul class="list-disc list-inside mt-4">
        {Object.entries(inventory).map(([ingredient, quantity]) => (
          <li key={ingredient} class="mb-2">
            <span class="font-medium">{ingredient}:</span> {quantity}
            {/* Add buttons or input fields to update quantity */}
            {/* Example: */}
            <button
              class="btn btn-outline-primary ml-2"
              onClick={() => handleUpdateInventory(ingredient, quantity + 10)}
            >
              Add 10
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
