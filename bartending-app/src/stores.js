// src/stores.js
import { writable } from 'svelte/store';
import { initialBarData } from './data/barData.js';

// Utility function to persist store data to localStorage
const persist = (store, key) => {
    const stored = localStorage.getItem(key);
    if (stored) {
        store.set(JSON.parse(stored));
    } else {
        store.set(initialBarData[key]);
    }
    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });
};

// Individual Stores
export const users = writable([]);
persist(users, 'users');

export const alcohols = writable([]);
persist(alcohols, 'alcohols');

export const mixers = writable([]);
persist(mixers, 'mixers');

export const syrups = writable([]);
persist(syrups, 'syrups');

export const bitters = writable([]);
persist(bitters, 'bitters');

export const garnishes = writable([]);
persist(garnishes, 'garnishes');

export const recipes = writable([]);
persist(recipes, 'recipes');

export const categories = writable([]);
persist(categories, 'categories');

export const tags = writable([]);
persist(tags, 'tags');

export const units = writable([]);
persist(units, 'units');

export const reviews = writable([]);
persist(reviews, 'reviews');

export const analyticsData = writable([]);
persist(analyticsData, 'analyticsData');

// Theme Store
export const theme = writable('light');

// Modal State
export const isModalOpen = writable(false);
export const modalContent = writable({ mode: '', id: null });

// Functions to open and close modal
export function openModalWindow(mode, id = null) {
    modalContent.set({ mode, id });
    isModalOpen.set(true);
}

export function closeModalWindow() {
    modalContent.set({ mode: '', id: null });
    isModalOpen.set(false);
}
