// src/components/BarTabs.jsx
import { h } from "preact";
import { useState } from "preact/hooks";
import { OpenTabsSection } from "./OpenTabsSection.jsx";
import { CategorySection } from "./CategorySection.jsx";
import { RecipesSection } from "./RecipesSection.jsx";

export function BarTabs({ barData }) {
  // local state for "open tabs"
  const [tabs, setTabs] = useState([]);
  // active tab for the nav
  const [activeTab, setActiveTab] = useState("openTabs");

  // TABS array for UI
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

  // 1) For all sections to add an item directly to a tab, we define:
  function addDrinkToTab(tabId, name, price) {
    const updated = tabs.map((t) => {
      if (t.id === tabId) {
        return {
          ...t,
          drinks: [...t.drinks, { name, price }],
        };
      }
      return t;
    });
    setTabs(updated);
  }

  // We'll pass this to each section: it prompts user to pick a tab, then calls addDrinkToTab
  function onAddToTab(itemName, defaultPrice = 0) {
    // Option A: inline prompt (window.prompt) or small custom modal,
    // or we can do something more advanced. Let's do a quick prompt:
    if (tabs.length === 0) {
      alert("No tabs open! Create a tab first in 'Open Tabs'.");
      return;
    }
    const tabIdStr = window.prompt(
      `Which tab number? (existing tabs: ${tabs.map((x) => x.id).join(", ")})`,
      tabs[0].id // default suggestion
    );
    if (!tabIdStr) return;
    const tabId = parseInt(tabIdStr);
    if (isNaN(tabId)) {
      alert("Invalid tab ID.");
      return;
    }

    // Optionally let user override the price:
    const newPriceStr = window.prompt(
      `Price for ${itemName}?`,
      defaultPrice.toFixed(2)
    );
    if (!newPriceStr) return;
    const newPrice = parseFloat(newPriceStr) || 0;

    addDrinkToTab(tabId, itemName, newPrice);
    alert(`Added ${itemName} to Tab #${tabId} at $${newPrice.toFixed(2)}`);
  }

  // 2) Render the active tab
  function renderActiveTabContent() {
    const tabDef = TABS.find((t) => t.key === activeTab);
    if (!tabDef) return null;

    switch (tabDef.key) {
      case "openTabs":
        // Show open tabs mgmt
        return (
          <OpenTabsSection
            tabs={tabs}
            setTabs={setTabs}
            bgClass={tabDef.bgClass}
          />
        );

      case "alcohol":
        return (
          <CategorySection
            dataObj={barData.alcoholTypes}
            title="Alcohol Types"
            bgClass={tabDef.bgClass}
            onAddToTab={onAddToTab} // pass callback
          />
        );

      case "mixers":
        return (
          <CategorySection
            dataObj={barData.mixers}
            title="Mixers"
            bgClass={tabDef.bgClass}
            onAddToTab={onAddToTab}
          />
        );

      case "garnishes":
        return (
          <CategorySection
            dataObj={barData.garnishes}
            title="Garnishes"
            bgClass={tabDef.bgClass}
            onAddToTab={onAddToTab}
          />
        );

      case "recipes":
        return (
          <RecipesSection
            recipesObj={barData.recipes}
            bgClass={tabDef.bgClass}
            onAddToTab={onAddToTab}
          />
        );

      default:
        return <p>Unknown tab.</p>;
    }
  }

  // 3) Tab button style
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
