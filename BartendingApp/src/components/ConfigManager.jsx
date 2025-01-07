// src/components/ConfigManager.jsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import {
  loadAllConfigs,
  saveConfig,
  deleteConfig,
  loadConfig,
  setLastActiveConfig,
} from "../utils/configStorage.js";
import { TEMPLATES } from "../utils/templates.js";

export function ConfigManager({
  activeConfigName,
  setActiveConfigName,
  barData,
  setBarData,
}) {
  const [allConfigs, setAllConfigs] = useState({});
  const [selectedConfigName, setSelectedConfigName] = useState("");
  const [newConfigName, setNewConfigName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Full Bar");

  // Load all configs on mount
  useEffect(() => {
    setAllConfigs(loadAllConfigs());
  }, []);

  const refreshConfigs = () => {
    setAllConfigs(loadAllConfigs());
  };

  // Load an existing config
  const handleSelectLoad = () => {
    if (!selectedConfigName) return;
    const cfg = loadConfig(selectedConfigName);
    if (!cfg) return;

    setActiveConfigName(selectedConfigName);
    setBarData(cfg);
    setLastActiveConfig(selectedConfigName); // remember last used
  };

  // Create a new config from a template
  const handleCreateNew = () => {
    if (!newConfigName.trim()) return;
    const templateData = structuredClone(TEMPLATES[selectedTemplate]);
    saveConfig(newConfigName.trim(), templateData);

    refreshConfigs();
    // Auto-load it
    setActiveConfigName(newConfigName.trim());
    setBarData(templateData);
    setLastActiveConfig(newConfigName.trim());

    setNewConfigName("");
  };

  // Remove config
  const handleDeleteConfig = () => {
    if (!selectedConfigName) return;
    deleteConfig(selectedConfigName);
    refreshConfigs();
    // If we deleted the active config, clear it
    if (selectedConfigName === activeConfigName) {
      setActiveConfigName(null);
      setBarData(null);
      setLastActiveConfig("");
    }
  };

  // Export config (same as before, copies JSON to clipboard)
  const handleExport = () => {
    if (!barData || !activeConfigName) return;
    const jsonStr = JSON.stringify(barData, null, 2);
    navigator.clipboard
      .writeText(jsonStr)
      .then(() => alert(`Copied config "${activeConfigName}" to clipboard.`))
      .catch((err) => alert("Failed to copy config."));
  };

  // TEXTAREA import
  const [importJson, setImportJson] = useState("");
  const handleTextareaImport = () => {
    if (!importJson.trim() || !newConfigName.trim()) {
      alert("Provide a new config name and some JSON data.");
      return;
    }
    try {
      const parsed = JSON.parse(importJson);
      saveConfig(newConfigName.trim(), parsed);
      refreshConfigs();

      setActiveConfigName(newConfigName.trim());
      setBarData(parsed);
      setLastActiveConfig(newConfigName.trim());

      alert(`Imported config as "${newConfigName.trim()}"`);
      setImportJson("");
      setNewConfigName("");
    } catch (err) {
      alert("Invalid JSON!");
    }
  };

  // FILE INPUT import
  const handleFileImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!newConfigName.trim()) {
      alert("Please enter a config name first.");
      e.target.value = null; // reset file
      return;
    }
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      saveConfig(newConfigName.trim(), parsed);
      refreshConfigs();

      setActiveConfigName(newConfigName.trim());
      setBarData(parsed);
      setLastActiveConfig(newConfigName.trim());

      alert(`Imported config from file as "${newConfigName.trim()}"`);
      setNewConfigName("");
      e.target.value = null; // clear the file input
    } catch (err) {
      alert("Invalid JSON in file!");
      e.target.value = null;
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Config Manager</h2>

      <section style={blockStyle}>
        <h3>Load an Existing Config</h3>
        <div style={{ marginBottom: "0.5rem" }}>
          <select
            value={selectedConfigName}
            onChange={(e) => setSelectedConfigName(e.target.value)}
          >
            <option value="">-- Choose config --</option>
            {Object.keys(allConfigs).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={handleSelectLoad} style={btnStyle}>
            Load
          </button>
          <button onClick={handleDeleteConfig} style={btnStyle}>
            Delete
          </button>
        </div>
      </section>

      <section style={blockStyle}>
        <h3>Create a New Config</h3>
        <div style={{ marginBottom: "0.5rem" }}>
          <input
            type="text"
            placeholder="Config Name"
            value={newConfigName}
            onInput={(e) => setNewConfigName(e.target.value)}
            style={{ marginRight: "0.5rem" }}
          />
          <label>
            Template:
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              {Object.keys(TEMPLATES).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <button onClick={handleCreateNew} style={btnStyle}>
            Create
          </button>
        </div>
      </section>

      <section style={blockStyle}>
        <h3>Import Config (via Textarea)</h3>
        <textarea
          rows="5"
          cols="40"
          placeholder="Paste JSON here"
          value={importJson}
          onInput={(e) => setImportJson(e.target.value)}
        />
        <br />
        <button onClick={handleTextareaImport} style={btnStyle}>
          Import from Text
        </button>
      </section>

      <section style={blockStyle}>
        <h3>Import Config (via File)</h3>
        <input type="file" accept=".json" onChange={handleFileImport} />
        <p
          style={{
            fontSize: "0.8rem",
            fontStyle: "italic",
            marginTop: "0.5rem",
          }}
        >
          Make sure to enter a config name in "Create a New Config" section
          above before choosing a file.
        </p>
      </section>

      <section style={blockStyle}>
        <h3>Export Current Config</h3>
        <p>Active Config: {activeConfigName || "(none loaded)"}</p>
        <button
          onClick={handleExport}
          style={btnStyle}
          disabled={!barData || !activeConfigName}
        >
          Copy JSON to Clipboard
        </button>
      </section>
    </div>
  );
}

const blockStyle = {
  marginBottom: "1.5rem",
  padding: "0.5rem",
  border: "1px solid #ccc",
};

const btnStyle = {
  marginLeft: "0.5rem",
  background: "#666",
  color: "#fff",
  border: "none",
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
};
