// src/components/ListEditorMulti.jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

/**
 * A multi-category list editor, but with category selection via colored buttons
 * instead of a dropdown.
 *
 * Props:
 *  - title: string (e.g. "Alcohol")
 *  - categoryNames: string[] (e.g. Object.keys(barData.alcoholTypes))
 *  - getItems(cat: string): string[] (returns items for the category)
 *  - onAdd(cat: string, newItem: string): void
 *  - onRemove(cat: string, item: string): void
 */

// 1) Helper to pick a random color from a small palette
function randomColor() {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function ListEditorMulti({
  title,
  categoryNames,
  getItems,
  onAdd,
  onRemove,
}) {
  // 2) Keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0]);

  // 3) Store a random color for each category so it stays consistent
  const [catColors, setCatColors] = useState({});

  // Initialize a random color for each category, but only once
  useEffect(() => {
    const newColors = { ...catColors };
    categoryNames.forEach((cat) => {
      if (!newColors[cat]) {
        newColors[cat] = randomColor();
      }
    });
    setCatColors(newColors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryNames]);

  // For new items
  const [newItem, setNewItem] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    onAdd(selectedCategory, newItem.trim());
    setNewItem("");
  };

  const items = getItems(selectedCategory) || [];

  return (
    <div
      style={{
        marginBottom: "2rem",
        border: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      {/* ROW OF CATEGORY BUTTONS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          margin: "1rem 0",
        }}
      >
        {categoryNames.map((cat) => {
          const isActive = cat === selectedCategory;
          // If active, we can highlight with border or darken color
          const buttonStyle = {
            backgroundColor: catColors[cat] || "#ccc",
            color: "#fff",
            border: isActive ? "3px solid #000" : "1px solid transparent",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          };
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={buttonStyle}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* LIST OF ITEMS FOR THE SELECTED CATEGORY */}
      <ul style={{ marginTop: "1rem" }}>
        {items.map((item) => (
          <li key={item}>
            {item}{" "}
            <button
              style={{
                marginLeft: "0.5rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.3rem 0.6rem",
                cursor: "pointer",
              }}
              onClick={() => onRemove(selectedCategory, item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* FORM TO ADD A NEW ITEM */}
      <form onSubmit={handleAdd} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder={`New ${title}`}
          value={newItem}
          onInput={(e) => setNewItem(e.target.value)}
        />
        <button
          type="submit"
          style={{
            marginLeft: "0.5rem",
            backgroundColor: "#03a9f4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
