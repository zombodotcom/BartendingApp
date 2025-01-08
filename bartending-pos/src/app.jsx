// src/App.jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import { BarTabs } from "./components/BarTabs.jsx";
import { ManageData } from "./components/ManageData.jsx";
import { ConfigManager } from "./components/ConfigManager.jsx";
import { ToastContainer } from "./components/ToastContainer.jsx";

import {
  loadConfig,
  saveConfig,
  getLastActiveConfig,
  setLastActiveConfig,
} from "./utils/configStorage.js";

import { initialBarData } from "./data/barData.js";

import { ToastContext } from "./context/ToastContext.jsx"; // Import the ToastContext

export function App() {
  const [activeConfigName, setActiveConfigName] = useState(null);
  const [barData, setBarData] = useState(null);
  const [activeTab, setActiveTab] = useState("config"); // default to config tab
  const [toasts, setToasts] = useState([]); // Manage toasts

  // Function to show toast
  const showToast = (title, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, message, duration },
    ]);
  };

  // Function to remove toast
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

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
    <ToastContext.Provider value={{ showToast }}>
      <div class="flex flex-col h-screen">
        {/* A dark Bootstrap navbar */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <span class="navbar-brand">Bartending POS App</span>
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
        <div class="flex-grow p-4 overflow-auto">
          {activeTab === "view" && barData && (
            <BarTabs barData={barData} setBarData={setBarData} />
          )}
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

        {/* ToastContainer for global toasts */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </ToastContext.Provider>
  );
}
