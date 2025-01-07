// src/components/BarTabs.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

export function BarTabs({ barData }) {
  const [tabs, setTabs] = useState([]);
  // The name of the currently active tab (one of: "openTabs", "alcohol", "mixers", "garnishes", "recipes")
  const [activeTab, setActiveTab] = useState("openTabs");

  return (
    <div class="container">
      <h1 class="mb-4">Bartending Tab Manager</h1>

      {/* Bootstrap Nav Tabs */}
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <button
            class={`nav-link ${activeTab === "openTabs" ? "active" : ""}`}
            onClick={() => setActiveTab("openTabs")}
          >
            Open Tabs
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${activeTab === "alcohol" ? "active" : ""}`}
            onClick={() => setActiveTab("alcohol")}
          >
            Alcohol
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${activeTab === "mixers" ? "active" : ""}`}
            onClick={() => setActiveTab("mixers")}
          >
            Mixers
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${activeTab === "garnishes" ? "active" : ""}`}
            onClick={() => setActiveTab("garnishes")}
          >
            Garnishes
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${activeTab === "recipes" ? "active" : ""}`}
            onClick={() => setActiveTab("recipes")}
          >
            Recipes
          </button>
        </li>
      </ul>

      {/* TAB CONTENT: Render conditionally based on activeTab */}

      {/* 1) OPEN TABS */}
      {activeTab === "openTabs" && (
        <section class="mb-5">
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
      )}

      {/* 2) ALCOHOL TYPES */}
      {activeTab === "alcohol" && (
        <section class="mb-5">
          <h2 class="mb-3">Alcohol Types</h2>
          <div class="row">
            {Object.entries(barData.alcoholTypes).map(([category, brands]) => (
              <div class="col-md-4 col-sm-6 mb-4" key={category}>
                <div class="card h-100">
                  <div class="card-body">
                    <h4 class="card-title">{category}</h4>
                    <ul class="list-group list-group-flush mt-3">
                      {brands.map((brand) => (
                        <li class="list-group-item" key={brand}>
                          {brand}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3) MIXERS */}
      {activeTab === "mixers" && (
        <section class="mb-5">
          <h2 class="mb-3">Mixers</h2>
          <div class="row">
            {Object.entries(barData.mixers).map(([type, items]) => (
              <div class="col-md-4 col-sm-6 mb-4" key={type}>
                <div class="card h-100">
                  <div class="card-body">
                    <h4 class="card-title">{type}</h4>
                    <ul class="list-group list-group-flush mt-3">
                      {items.map((mixer) => (
                        <li class="list-group-item" key={mixer}>
                          {mixer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4) GARNISHES */}
      {activeTab === "garnishes" && (
        <section class="mb-5">
          <h2 class="mb-3">Garnishes</h2>
          <div class="row">
            {Object.entries(barData.garnishes).map(([group, items]) => (
              <div class="col-md-4 col-sm-6 mb-4" key={group}>
                <div class="card h-100">
                  <div class="card-body">
                    <h4 class="card-title">{group}</h4>
                    <ul class="list-group list-group-flush mt-3">
                      {items.map((item) => (
                        <li class="list-group-item" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5) RECIPES */}
      {activeTab === "recipes" && (
        <section>
          <h2 class="mb-3">Recipes</h2>
          <div class="row">
            {Object.entries(barData.recipes).map(([name, recipe]) => (
              <div class="col-md-4 col-sm-6 mb-4" key={name}>
                <div class="card h-100">
                  <div class="card-body">
                    <h4 class="card-title">{name}</h4>
                    <ul class="list-group list-group-flush mt-3 mb-2">
                      {Object.entries(recipe.ingredients).map(
                        ([ingredient, amount]) => (
                          <li class="list-group-item" key={ingredient}>
                            <strong>{ingredient}</strong>: {amount}
                          </li>
                        )
                      )}
                    </ul>
                    <p>
                      <strong>Price:</strong> ${recipe.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
