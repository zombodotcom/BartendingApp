// src/utils/configStorage.js

export const LOCAL_STORAGE_KEY = 'myBartenderConfigs';
export const LAST_ACTIVE_KEY = 'myBartenderLastConfig';

// Load all configs
export function loadAllConfigs() {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

// Save all configs
export function saveAllConfigs(configs) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configs));
}

// Save/update a single config
export function saveConfig(configName, barData) {
    const all = loadAllConfigs();
    all[configName] = barData;
    saveAllConfigs(all);
}

// Delete a config
export function deleteConfig(configName) {
    const all = loadAllConfigs();
    delete all[configName];
    saveAllConfigs(all);
}

// Load a single config
export function loadConfig(configName) {
    const all = loadAllConfigs();
    return all[configName] || null;
}

// Track which config is last active
export function setLastActiveConfig(configName) {
    localStorage.setItem(LAST_ACTIVE_KEY, configName);
}
export function getLastActiveConfig() {
    return localStorage.getItem(LAST_ACTIVE_KEY);
}
