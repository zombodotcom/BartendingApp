// src/components/ManageData.jsx
import { h } from "preact";
import { ListEditorMulti } from "./ListEditorMulti.jsx";
import { RecipeEditor } from "./RecipeEditor.jsx";

export function ManageData({ barData, setBarData }) {
  // 1) Handler for adding/removing items in ANY multi-category object
  const addMultiItem = (objKey, cat, newItem) => {
    const updated = structuredClone(barData);
    updated[objKey][cat].push(newItem);
    setBarData(updated);
  };

  const removeMultiItem = (objKey, cat, item) => {
    const updated = structuredClone(barData);
    updated[objKey][cat] = updated[objKey][cat].filter((i) => i !== item);
    setBarData(updated);
  };

  // 2) Handler for adding/removing recipes
  const addRecipe = (name, price) => {
    const updated = structuredClone(barData);
    updated.recipes[name] = {
      ingredients: {},
      price,
    };
    setBarData(updated);
  };

  const removeRecipe = (name) => {
    const updated = structuredClone(barData);
    delete updated.recipes[name];
    setBarData(updated);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Manage Bar Data</h2>

      {/* ALCOHOL: "alcoholTypes" */}
      <ListEditorMulti
        title="Alcohol"
        categoryNames={Object.keys(barData.alcoholTypes)}
        getItems={(cat) => barData.alcoholTypes[cat]}
        onAdd={(cat, item) => addMultiItem("alcoholTypes", cat, item)}
        onRemove={(cat, item) => removeMultiItem("alcoholTypes", cat, item)}
      />

      {/* MIXERS: "mixers" */}
      <ListEditorMulti
        title="Mixers"
        categoryNames={Object.keys(barData.mixers)}
        getItems={(cat) => barData.mixers[cat]}
        onAdd={(cat, item) => addMultiItem("mixers", cat, item)}
        onRemove={(cat, item) => removeMultiItem("mixers", cat, item)}
      />

      {/* GARNISHES: "garnishes" */}
      <ListEditorMulti
        title="Garnishes"
        categoryNames={Object.keys(barData.garnishes)}
        getItems={(cat) => barData.garnishes[cat]}
        onAdd={(cat, item) => addMultiItem("garnishes", cat, item)}
        onRemove={(cat, item) => removeMultiItem("garnishes", cat, item)}
      />

      {/* RECIPES */}
      <RecipeEditor
        recipes={barData.recipes}
        onAddRecipe={addRecipe}
        onRemoveRecipe={removeRecipe}
      />
    </div>
  );
}
