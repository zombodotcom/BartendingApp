// src/data/barData.js

export const initialBarData = {
    bills: [],
    recipes: {
        Margarita: {
            price: 10.0,
            ingredients: {
                Tequila: "2 oz",
                TripleSec: "1 oz",
                LimeJuice: "1 oz",
                Salt: "for rimming",
            },
        },
        OldFashioned: {
            price: 8.5,
            ingredients: {
                Bourbon: "2 oz",
                Sugar: "1 cube",
                AngosturaBitters: "2 dashes",
                Water: "dash",
            },
        },
        // Add more recipes as needed
    },
    inventory: {
        Tequila: 100, // in ounces
        TripleSec: 50,
        LimeJuice: 75,
        Salt: 200, // in grams or appropriate unit
        Bourbon: 80,
        Sugar: 100, // in cubes or grams
        AngosturaBitters: 30,
        Water: 500, // in ounces or liters
        // Add more ingredients as needed
    },
    orders: [], // Initialize as an empty array
};
