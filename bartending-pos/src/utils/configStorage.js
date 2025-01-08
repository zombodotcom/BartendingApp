// src/utils/configStorage.js

/**
 * Load configuration data from localStorage.
 * @param {string} configName - The name of the configuration to load.
 * @returns {object|null} - The loaded configuration object or null if not found.
 */
export function loadConfig(configName) {
  const config = localStorage.getItem(`config_${configName}`);
  return config ? JSON.parse(config) : null;
}

/**
 * Save configuration data to localStorage.
 * @param {string} configName - The name of the configuration to save.
 * @param {object} data - The configuration data to save.
 */
export function saveConfig(configName, data) {
  localStorage.setItem(`config_${configName}`, JSON.stringify(data));
}

/**
 * Get the last active configuration name from localStorage.
 * @returns {string|null} - The name of the last active configuration or null if not set.
 */
export function getLastActiveConfig() {
  return localStorage.getItem('lastActiveConfig');
}

/**
 * Set the last active configuration name in localStorage.
 * @param {string} configName - The name of the configuration to set as last active.
 */
export function setLastActiveConfig(configName) {
  localStorage.setItem('lastActiveConfig', configName);
}
