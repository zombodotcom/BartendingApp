// src/App.jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { BarTabs } from "./components/BarTabs.jsx";
import { ManageData } from "./components/ManageData.jsx";
import { ConfigManager } from "./components/ConfigManager.jsx";

import {
  loadConfig,
  saveConfig,
  getLastActiveConfig,
  setLastActiveConfig,
} from "./utils/configStorage.js";

import { initialBarData } from "./data/barData.js";

export function App() {
  const [activeConfigName, setActiveConfigName] = useState(null);
  const [barData, setBarData] = useState(null);
  const [activeTab, setActiveTab] = useState("config"); // default to config tab

  // 1) On mount, load or create "Default" config
  useEffect(() => {
    const last = getLastActiveConfig();
    if (last) {
      const data = loadConfig(last);
      if (data) {
        setActiveConfigName(last);
        setBarData(data);
        setActiveTab("view");
      }
    } else {
      const existingDefault = loadConfig("Default");
      if (!existingDefault) {
        // create "Default" in localStorage
        saveConfig("Default", initialBarData);
      }
      const loaded = loadConfig("Default");
      if (loaded) {
        setActiveConfigName("Default");
        setBarData(loaded);
        setLastActiveConfig("Default");
        setActiveTab("view");
      }
    }
  }, []);

  // 2) Whenever barData changes, save to localStorage
  useEffect(() => {
    if (activeConfigName && barData) {
      saveConfig(activeConfigName, barData);
      setLastActiveConfig(activeConfigName);
    }
  }, [barData, activeConfigName]);

  return (
    <div class="d-flex flex-column vh-100">
      {/* A dark Bootstrap navbar */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <span class="navbar-brand">Bartending Tab App</span>
          <div>
            <button
              class="btn btn-outline-light me-2"
              onClick={() => setActiveTab("view")}
              disabled={!barData}
            >
              View
            </button>
            <button
              class="btn btn-outline-light me-2"
              onClick={() => setActiveTab("edit")}
              disabled={!barData}
            >
              Edit
            </button>
            <button
              class="btn btn-outline-light"
              onClick={() => setActiveTab("config")}
            >
              Config
            </button>
          </div>
        </div>
      </nav>

      {/* Main content area: fill the rest of the page */}
      <div class="container-fluid flex-grow-1 overflow-auto p-3">
        {activeTab === "view" && barData && <BarTabs barData={barData} />}
        {activeTab === "edit" && barData && (
          <ManageData barData={barData} setBarData={setBarData} />
        )}
        {activeTab === "config" && (
          <ConfigManager
            activeConfigName={activeConfigName}
            setActiveConfigName={setActiveConfigName}
            barData={barData}
            setBarData={setBarData}
          />
        )}
      </div>
    </div>
  );
}
