// src/components/BarTabs.jsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { CardGrid } from "./CardGrid.jsx"; // <-- Our generic grid component

export function BarTabs({ barData }) {
  // local state for "open tabs" (as an example)
  const [tabs, setTabs] = useState([]);

  // which tab is active?
  const [activeTab, setActiveTab] = useState("openTabs");

  // define your tab structure in one place
  // Now each tab has a 'navStyle' for the button + 'bgClass' for content area
  const TABS = [
    {
      key: "openTabs",
      label: "Open Tabs",
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
      key: "recipes",
      label: "Recipes",
      bgClass: "bg-secondary text-white",
      navStyle: { backgroundColor: "#607D8B", color: "#fff" },
    },
  ];

  // Renders the "Open Tabs" section
  function renderOpenTabsSection(bgClass) {
    return (
      <section class={`p-3 mb-5 rounded ${bgClass}`}>
        <h2 class="mb-3">Open Tabs</h2>
        {tabs.length === 0 ? (
          <p>No open tabs yet.</p>
        ) : (
          tabs.map((tab) => (
            <div key={tab.id} class="card mb-3">
              <div class="card-body">
                <h3 class="card-title">Tab #{tab.id}</h3>
                <ul class="list-unstyled">
                  {tab.drinks.map((drink, idx) => (
                    <li key={idx}>
                      {drink.name} - ${drink.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </section>
    );
  }

  // Renders a categories object (like barData.alcoholTypes, mixers, or garnishes)
  // using our CardGrid
  function renderCategorySection(dataObj, title, bgClass) {
    // define how each item looks in the CardGrid
    const renderItem = (catName, itemsArray) => (
      <div class="card h-100">
        <div class="card-body">
          <h4 class="card-title">{catName}</h4>
          <ul class="list-group list-group-flush mt-3">
            {itemsArray.map((item) => (
              <li class="list-group-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    return (
      <section class={`p-3 mb-5 rounded ${bgClass}`}>
        <h2 class="mb-3">{title}</h2>
        <CardGrid data={dataObj} renderItem={renderItem} />
      </section>
    );
  }

  // Renders the recipes using CardGrid
  function renderRecipesSection(recipesObj, bgClass) {
    const renderRecipeCard = (recipeName, recipeData) => (
      <div class="card h-100">
        <div class="card-body">
          <h4 class="card-title">{recipeName}</h4>
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

  // Chooses what content to render based on activeTab
  function renderActiveTabContent() {
    const tabDef = TABS.find((t) => t.key === activeTab);
    if (!tabDef) return null;

    switch (tabDef.key) {
      case "openTabs":
        return renderOpenTabsSection(tabDef.bgClass);

      case "alcohol":
        return renderCategorySection(
          barData.alcoholTypes,
          "Alcohol Types",
          tabDef.bgClass
        );

      case "mixers":
        return renderCategorySection(barData.mixers, "Mixers", tabDef.bgClass);

      case "garnishes":
        return renderCategorySection(
          barData.garnishes,
          "Garnishes",
          tabDef.bgClass
        );

      case "recipes":
        return renderRecipesSection(barData.recipes, tabDef.bgClass);

      default:
        return <p>Unknown tab.</p>;
    }
  }

  // We define a small helper to style each button
  // If it's the active tab, we can highlight it with a border, etc.
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
      <h1 class="mb-4">Bartending Tab Manager</h1>

      {/* NAV TABS - loop over TABS array, but use inline styles for each button */}
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

      {/* TAB CONTENT */}
      {renderActiveTabContent()}
    </div>
  );
}
