// src/components/CategorySection.jsx
import { h } from "preact";
import { CardGrid } from "./CardGrid.jsx";

/**
 * A reusable section for "category -> string[]" style data (like Alcohol, Mixers, Garnishes).
 *
 * Props:
 *  - dataObj: { [categoryName: string]: string[] }
 *  - title: string  (heading)
 *  - bgClass: string (like "bg-info text-white")
 *  - onAddToBill: Function to add an item to a bill
 */
export function CategorySection({ dataObj, title, bgClass, onAddToBill }) {
  // Define how each item is rendered in the CardGrid
  const renderItem = (categoryName, itemsArray) => (
    <div class="card h-100">
      <div class="card-body">
        <h4 class="card-title">{categoryName}</h4>
        <ul class="list-group list-group-flush mt-3">
          {itemsArray.map((item) => (
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              key={item}
            >
              <span>{item}</span>
              {/* "Add to Bill" button */}
              <button
                class="btn btn-sm btn-outline-primary"
                onClick={() => onAddToBill(item, 0)} // Assuming default price 0; can be customized
              >
                Add to Bill
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
