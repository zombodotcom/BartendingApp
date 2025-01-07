// src/components/OpenTabsSection.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

/**
 * A component that displays the "Open Tabs" UI:
 *  - A list of tabs
 *  - Create new tab
 *  - Reset single tab / all tabs
 *  - Add a drink to a chosen tab
 */
export function OpenTabsSection({
  tabs,
  setTabs,
  bgClass = "bg-light text-dark",
}) {
  // We'll add a small form to pick a tab, then a drink name & price
  const [selectedTabId, setSelectedTabId] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState("");

  // Create a new tab with a unique id
  function createNewTab() {
    const newId = tabs.length > 0 ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    const newTab = { id: newId, drinks: [] };
    setTabs([...tabs, newTab]);
  }

  // Add a drink to a tab by ID
  function addDrinkToTab(tabId, drinkName, drinkPrice) {
    const updated = tabs.map((tab) => {
      if (tab.id === tabId) {
        return {
          ...tab,
          drinks: [...tab.drinks, { name: drinkName, price: drinkPrice }],
        };
      }
      return tab;
    });
    setTabs(updated);
  }

  // handle form submission
  function handleAddDrink(e) {
    e.preventDefault();
    if (!selectedTabId || !drinkName.trim()) return;
    addDrinkToTab(
      parseInt(selectedTabId),
      drinkName.trim(),
      parseFloat(drinkPrice) || 0
    );
    setDrinkName("");
    setDrinkPrice("");
  }

  // Reset the drinks in a single tab
  function resetTab(tabId) {
    const updated = tabs.map((tab) => {
      if (tab.id === tabId) {
        return { ...tab, drinks: [] };
      }
      return tab;
    });
    setTabs(updated);
  }

  // Remove all tabs
  function resetAllTabs() {
    setTabs([]);
  }

  return (
    <section class={`p-3 mb-5 rounded ${bgClass}`}>
      <h2 class="mb-3">Open Tabs</h2>

      {/* Buttons to create a new tab, reset all */}
      <div class="mb-3">
        <button class="btn btn-primary me-2" onClick={createNewTab}>
          + Create New Tab
        </button>
        <button class="btn btn-danger" onClick={resetAllTabs}>
          Reset All Tabs
        </button>
      </div>

      {tabs.length === 0 ? (
        <p>No open tabs yet.</p>
      ) : (
        <div>
          {/* Show each open tab */}
          {tabs.map((tab) => (
            <div key={tab.id} class="card mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  Tab #{tab.id}
                  <button
                    class="btn btn-sm btn-outline-danger float-end"
                    onClick={() => resetTab(tab.id)}
                  >
                    Reset Tab
                  </button>
                </h3>
                <ul class="list-unstyled">
                  {tab.drinks.length === 0 && <li>No drinks yet.</li>}
                  {tab.drinks.map((drink, idx) => (
                    <li key={idx}>
                      {drink.name} - ${drink.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Form to add a new drink to a chosen tab */}
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Add a Drink to a Tab</h4>
              <form onSubmit={handleAddDrink} class="row g-3">
                <div class="col-auto">
                  <label class="form-label">Select Tab:</label>
                  <select
                    class="form-select"
                    value={selectedTabId}
                    onChange={(e) => setSelectedTabId(e.target.value)}
                  >
                    <option value="">-- choose a tab --</option>
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        Tab #{tab.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-auto">
                  <label class="form-label">Drink Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. Old Fashioned"
                    value={drinkName}
                    onInput={(e) => setDrinkName(e.target.value)}
                  />
                </div>
                <div class="col-auto">
                  <label class="form-label">Price:</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    placeholder="0.00"
                    value={drinkPrice}
                    onInput={(e) => setDrinkPrice(e.target.value)}
                  />
                </div>
                <div class="col-auto align-self-end">
                  <button type="submit" class="btn btn-success">
                    Add Drink
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
