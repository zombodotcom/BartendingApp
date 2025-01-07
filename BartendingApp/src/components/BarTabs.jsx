// src/components/BarTabs.jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

// Import the specialized sections:
import { OpenBillsSection } from "./OpenBillsSection.jsx";
import { CategorySection } from "./CategorySection.jsx";
import { RecipesSection } from "./RecipesSection.jsx";
import { ManageRecipesSection } from "./ManageRecipesSection.jsx"; // Ensure this import exists

/**
 * The main component handling the tabbed UI for managing bills and recipes.
 *
 * Props:
 *  - barData: Object containing alcoholTypes, mixers, garnishes
 */
export function BarTabs({ barData }) {
  // Initialize bills from localStorage or start with an empty array
  const [bills, setBills] = useState(() => {
    try {
      const saved = localStorage.getItem("bartenderBills");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load bills from localStorage:", error);
      return [];
    }
  });

  // Initialize recipes from localStorage or start with default recipes
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem("bartenderRecipes");
      return saved
        ? JSON.parse(saved)
        : {
            Margarita: {
              price: 10.0,
              ingredients: {
                Tequila: "2 oz",
                TripleSec: "1 oz",
                LimeJuice: "1 oz",
                Salt: "for rimming",
              },
            },
            OldFashioned: {
              price: 8.5,
              ingredients: {
                Bourbon: "2 oz",
                Sugar: "1 cube",
                AngosturaBitters: "2 dashes",
                Water: "dash",
              },
            },
          };
    } catch (error) {
      console.error("Failed to load recipes from localStorage:", error);
      return {};
    }
  });

  // Persist bills to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("bartenderBills", JSON.stringify(bills));
    } catch (error) {
      console.error("Failed to save bills to localStorage:", error);
    }
  }, [bills]);

  // Persist recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("bartenderRecipes", JSON.stringify(recipes));
    } catch (error) {
      console.error("Failed to save recipes to localStorage:", error);
    }
  }, [recipes]);

  // Active tab state
  const [activeTab, setActiveTab] = useState("openBills");

  // Define your tab structure in one place
  const TABS = [
    {
      key: "openBills",
      label: "Open Bills",
      bgClass: "bg-light text-dark",
      navStyle: { backgroundColor: "#F44336", color: "#fff" },
    },
    {
      key: "alcohol",
      label: "Alcohol",
      bgClass: "bg-info text-white",
      navStyle: { backgroundColor: "#9C27B0", color: "#fff" },
    },
    {
      key: "mixers",
      label: "Mixers",
      bgClass: "bg-warning text-dark",
      navStyle: { backgroundColor: "#FF9800", color: "#fff" },
    },
    {
      key: "garnishes",
      label: "Garnishes",
      bgClass: "bg-success text-white",
      navStyle: { backgroundColor: "#4CAF50", color: "#fff" },
    },
    {
      key: "manageRecipes",
      label: "Manage Recipes",
      bgClass: "bg-secondary text-white",
      navStyle: { backgroundColor: "#607D8B", color: "#fff" },
    },
  ];

  // Function to add an item to a bill
  function onAddToBill(itemName, defaultPrice = 0) {
    if (bills.length === 0) {
      alert("No open bills! Create a bill first in 'Open Bills'.");
      return;
    }

    // Prompt user to select which bill to add to
    const billIdStr = window.prompt(
      `Which bill number? (existing bills: ${bills
        .map((b) => b.id)
        .join(", ")})`,
      bills[0].id
    );

    if (!billIdStr) return;

    const billId = parseInt(billIdStr);
    if (isNaN(billId)) {
      alert("Invalid bill ID.");
      return;
    }

    // Optionally let user override the price
    const newPriceStr = window.prompt(
      `Price for ${itemName}?`,
      defaultPrice.toFixed(2)
    );

    if (newPriceStr === null) return; // User cancelled

    const newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice)) {
      alert("Invalid price. Using default price $0.00.");
    }

    // Add the item to the chosen bill
    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        return {
          ...bill,
          drinks: [
            ...bill.drinks,
            { name: itemName, price: isNaN(newPrice) ? 0 : newPrice },
          ],
        };
      }
      return bill;
    });

    setBills(updatedBills);
    alert(
      `Added ${itemName} to Bill #${billId} at $${
        isNaN(newPrice) ? "0.00" : newPrice.toFixed(2)
      }`
    );
  }

  // Function to remove a drink from a bill
  function removeDrinkFromBill(billId, drinkIndex) {
    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        const updatedDrinks = bill.drinks.filter(
          (_, idx) => idx !== drinkIndex
        );
        return { ...bill, drinks: updatedDrinks };
      }
      return bill;
    });
    setBills(updatedBills);
  }

  // Function to add a new recipe
  function addNewRecipe(recipeName, price) {
    if (!recipeName.trim()) {
      alert("Recipe name cannot be empty.");
      return;
    }
    if (recipes.hasOwnProperty(recipeName)) {
      alert("Recipe already exists.");
      return;
    }
    const newRecipes = {
      ...recipes,
      [recipeName.trim()]: {
        price: parseFloat(price) || 0,
        ingredients: {}, // Initialize with empty ingredients
      },
    };
    setRecipes(newRecipes);
    alert(`Added new recipe: ${recipeName}`);
  }

  // Function to remove an existing recipe
  function removeRecipe(recipeName) {
    if (!recipes.hasOwnProperty(recipeName)) {
      alert("Recipe does not exist.");
      return;
    }
    const { [recipeName]: _, ...remainingRecipes } = recipes;
    setRecipes(remainingRecipes);
    alert(`Removed recipe: ${recipeName}`);
  }

  // Function to update ingredients of a recipe
  function updateRecipeIngredients(
    recipeName,
    ingredientName,
    ingredientAmount,
    action
  ) {
    if (!recipes.hasOwnProperty(recipeName)) {
      alert("Recipe does not exist.");
      return;
    }

    let updatedRecipes = { ...recipes };

    if (action === "add") {
      // Add or update ingredient
      updatedRecipes[recipeName] = {
        ...updatedRecipes[recipeName],
        ingredients: {
          ...updatedRecipes[recipeName].ingredients,
          [ingredientName]: ingredientAmount,
        },
      };
    } else if (action === "remove") {
      // Remove ingredient
      const { [ingredientName]: _, ...remainingIngredients } =
        updatedRecipes[recipeName].ingredients;
      updatedRecipes[recipeName] = {
        ...updatedRecipes[recipeName],
        ingredients: remainingIngredients,
      };
    }

    setRecipes(updatedRecipes);
  }

  // Decide which tab content to render
  function renderActiveTabContent() {
    const tabDef = TABS.find((t) => t.key === activeTab);
    if (!tabDef) return null;

    switch (tabDef.key) {
      case "openBills":
        return (
          <OpenBillsSection
            bills={bills}
            setBills={setBills}
            bgClass={tabDef.bgClass}
            removeDrinkFromBill={removeDrinkFromBill}
          />
        );
      case "alcohol":
        return (
          <CategorySection
            dataObj={barData.alcoholTypes}
            title="Alcohol Types"
            bgClass={tabDef.bgClass}
            onAddToBill={onAddToBill}
          />
        );
      case "mixers":
        return (
          <CategorySection
            dataObj={barData.mixers}
            title="Mixers"
            bgClass={tabDef.bgClass}
            onAddToBill={onAddToBill}
          />
        );
      case "garnishes":
        return (
          <CategorySection
            dataObj={barData.garnishes}
            title="Garnishes"
            bgClass={tabDef.bgClass}
            onAddToBill={onAddToBill}
          />
        );
      case "manageRecipes":
        return (
          <ManageRecipesSection
            recipes={recipes}
            addNewRecipe={addNewRecipe}
            removeRecipe={removeRecipe}
            updateRecipeIngredients={updateRecipeIngredients}
            bgClass={tabDef.bgClass}
          />
        );
      default:
        return <p>Unknown tab.</p>;
    }
  }

  // Style for each tab button
  function getTabButtonStyle(tab) {
    const isActive = activeTab === tab.key;
    return {
      ...tab.navStyle,
      border: isActive ? "3px solid #000" : "3px solid transparent",
      marginRight: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      cursor: "pointer",
    };
  }

  return (
    <div class="container">
      <h1 class="mb-4">Bartending Bill Manager</h1>

      {/* Nav bar for tabs */}
      <div style={{ marginBottom: "1rem" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            style={getTabButtonStyle(tab)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {renderActiveTabContent()}
    </div>
  );
}
