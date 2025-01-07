// src/components/CategorySection.jsx
import { h } from "preact";
import { CardGrid } from "./CardGrid.jsx";

export function CategorySection({ dataObj, title, bgClass, onAddToTab }) {
  // define how each item is rendered in the CardGrid
  const renderItem = (catName, itemsArray) => (
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title">{catName}</h4>
        <ul class="list-group list-group-flush mt-3">
          {itemsArray.map((item) => (
            <li
              class="list-group-item d-flex justify-content-between"
              key={item}
            >
              <span>{item}</span>
              {/* "Add to Tab" button */}
              <button
                class="btn btn-sm btn-outline-primary"
                onClick={() => onAddToTab(item, 0)}
              >
                Add to Tab
              </button>
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
