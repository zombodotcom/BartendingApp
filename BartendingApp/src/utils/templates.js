// src/utils/templates.js
import { initialBarData } from '../data/barData.js';
import { altBarData } from '../data/altBarData.js';

export const TEMPLATES = {
    'Empty': {
        // For a brand-new blank config
        alcoholTypes: {},
        mixers: {},
        garnishes: {},
        recipes: {},
    },
    'Full Bar': initialBarData,   // Our main "really good" data
    'Light Bar': altBarData       // Some smaller data set
};
