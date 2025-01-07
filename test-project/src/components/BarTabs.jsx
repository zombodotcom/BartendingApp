// src/components/BarTabs.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

export function BarTabs({ barData }) {
  const [tabs, setTabs] = useState([]);

  return (
    <div class="container">
      <h1 class="mb-4">Bartending Tab Manager</h1>

      {/* SECTION: Open Tabs */}
      <section class="mb-5">
        <h2 class="mb-3">Open Tabs</h2>
        {tabs.length === 0 ? (
          <p>No open tabs yet.</p>
        ) : (
          tabs.map((tab) => (
            <div key={tab.id} class="card mb-3">
              <div class="card-body">
                <h3 class="card-title">Tab #{tab.id}</h3>
                <ul>
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

      {/* SECTION: Alcohol Types */}
      <section class="mb-5">
        <h2 class="mb-3">Alcohol Types</h2>
        {Object.entries(barData.alcoholTypes).map(([category, brands]) => (
          <div class="mb-4" key={category}>
            <h4>{category}</h4>
            <ul class="list-group">
              {brands.map((brand) => (
                <li class="list-group-item" key={brand}>
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* SECTION: Mixers */}
      <section class="mb-5">
        <h2 class="mb-3">Mixers</h2>
        {Object.entries(barData.mixers).map(([type, items]) => (
          <div class="mb-4" key={type}>
            <h4>{type}</h4>
            <ul class="list-group">
              {items.map((mixer) => (
                <li class="list-group-item" key={mixer}>
                  {mixer}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* SECTION: Garnishes */}
      <section class="mb-5">
        <h2 class="mb-3">Garnishes</h2>
        {Object.entries(barData.garnishes).map(([group, items]) => (
          <div class="mb-4" key={group}>
            <h4>{group}</h4>
            <ul class="list-group">
              {items.map((item) => (
                <li class="list-group-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* SECTION: Recipes */}
      <section>
        <h2 class="mb-3">Recipes</h2>
        {Object.entries(barData.recipes).map(([name, recipe]) => (
          <div class="mb-4" key={name}>
            <h4>{name}</h4>
            <ul class="list-group mb-2">
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
        ))}
      </section>
    </div>
  );
}
