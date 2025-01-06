import { h } from "preact";
import { useState } from "preact/hooks";
import TablesComponent from "./TablesComponent";
import RecipesComponent from "./RecipesComponent";
import { initialBarData } from "../data/barData";

const App = () => {
  const [barData, setBarData] = useState(initialBarData);
  const [currentTab, setCurrentTab] = useState("Tables");

  const updateBarData = (newData) => {
    setBarData({ ...barData, ...newData });
  };

  return (
    <div class="container mt-4">
      <h1 class="text-center mb-4">Bar Tab Manager</h1>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class={`nav-link ${currentTab === "Tables" ? "active" : ""}`}
            onClick={() => setCurrentTab("Tables")}
          >
            Tables
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${currentTab === "Recipes" ? "active" : ""}`}
            onClick={() => setCurrentTab("Recipes")}
          >
            Recipes
          </button>
        </li>
      </ul>
      {currentTab === "Tables" && (
        <TablesComponent barData={barData} updateBarData={updateBarData} />
      )}
      {currentTab === "Recipes" && (
        <RecipesComponent barData={barData} updateBarData={updateBarData} />
      )}
    </div>
  );
};

export default App;
