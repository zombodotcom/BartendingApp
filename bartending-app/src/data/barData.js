// src/data/barData.js

export const initialBarData = {
    users: [
        // Example User
        {
            id: 'user_1',
            username: 'bartenderJohn',
            email: 'john@example.com',
            passwordHash: 'hashed_password', // Handle securely!
            preferences: {
                theme: 'dark',
                language: 'en',
            },
            favorites: {
                recipes: ['recipe_old_fashioned'],
                ingredients: ['whiskey_bulleit_bourbon'],
            },
        },
        // ... more users
    ],

    alcohols: [
        // Example Alcohol
        {
            id: 'whiskey_bulleit_bourbon',
            type: 'Whiskey',
            category: 'Bourbon',
            brand: 'Bulleit Bourbon',
            quantity: 7,
            unit: 'bottles',
            description: 'A smooth and spicy bourbon.',
        },
        // ... more alcohols
    ],

    mixers: [
        {
            id: 'mixer_club_soda',
            category: 'Soda',
            name: 'Club Soda',
            description: 'Carbonated water with no added flavors.',
        },
        // ... more mixers
    ],

    syrups: [
        {
            id: 'syrup_simple',
            name: 'Simple Syrup',
            description: 'A basic sugar syrup used in various cocktails.',
        },
        // ... more syrups
    ],

    bitters: [
        {
            id: 'bitters_angostura',
            name: 'Angostura Bitters',
            description: 'A concentrated bitters used in many classic cocktails.',
        },
        // ... more bitters
    ],

    garnishes: [
        {
            id: 'garnish_orange_slice',
            category: 'Fruits',
            name: 'Orange Slice',
            description: 'A slice of orange used as a garnish.',
        },
        // ... more garnishes
    ],

    recipes: [
        {
            id: 'recipe_old_fashioned',
            name: 'Old Fashioned',
            category: 'Classic',
            description: 'A timeless whiskey cocktail.',
            instructions: [
                'Place a sugar cube in an Old Fashioned glass.',
                'Add bitters and a splash of water.',
                'Muddle until dissolved.',
                'Fill the glass with ice cubes.',
                'Pour bourbon over the ice.',
                'Garnish with an orange slice and a cherry.',
            ],
            preparationTime: 5, // in minutes
            difficulty: 'Easy',
            ingredients: [
                { type: 'alcohol', id: 'whiskey_bulleit_bourbon', quantity: 2, unit: 'oz' },
                { type: 'syrup', id: 'syrup_simple', quantity: 1, unit: 'tsp' },
                { type: 'bitters', id: 'bitters_angostura', quantity: 2, unit: 'dashes' },
                { type: 'garnish', id: 'garnish_orange_slice', quantity: 1, unit: 'slice', optional: false },
                { type: 'garnish', id: 'garnish_cherry', quantity: 1, unit: 'piece', optional: false },
            ],
            price: 10.0,
            ratings: [
                {
                    id: 'rating_1',
                    userId: 'user_1',
                    rating: 5,
                    comment: 'Perfect balance of flavors!',
                    timestamp: '2023-10-05T14:48:00.000Z',
                },
                // ... more ratings
            ],
        },
        // ... more recipes
    ],

    categories: [
        { id: 'category_classic', name: 'Classic', description: 'Timeless and traditional cocktails.' },
        { id: 'category_tropical', name: 'Tropical', description: 'Bright and fruity drinks perfect for warm weather.' },
        // ... more categories
    ],

    tags: [
        { id: 'tag_sour', name: 'Sour', description: 'A balance of sweet and tart flavors.' },
        { id: 'tag_sweet', name: 'Sweet', description: 'Predominantly sweet flavors.' },
        { id: 'tag_strong', name: 'Strong', description: 'Higher alcohol content.' },
        // ... more tags
    ],

    units: [
        { id: 'unit_oz', name: 'Ounce', abbreviation: 'oz', conversionFactor: 1 },
        { id: 'unit_ml', name: 'Milliliter', abbreviation: 'ml', conversionFactor: 0.033814 },
        { id: 'unit_tsp', name: 'Teaspoon', abbreviation: 'tsp', conversionFactor: 1 },
        { id: 'unit_dash', name: 'Dash', abbreviation: 'dash', conversionFactor: 1 },
        { id: 'unit_slice', name: 'Slice', abbreviation: 'slice', conversionFactor: 1 },
        { id: 'unit_piece', name: 'Piece', abbreviation: 'pc', conversionFactor: 1 },
        // ... more units
    ],

    reviews: [
        {
            id: 'review_1',
            recipeId: 'recipe_old_fashioned',
            userId: 'user_1',
            rating: 5,
            comment: 'Perfect balance of flavors!',
            timestamp: '2023-10-05T14:48:00.000Z',
        },
        // ... more reviews
    ],

    analyticsData: [
        {
            id: 'analytics_1',
            userId: 'user_1',
            action: 'viewed_recipe',
            targetId: 'recipe_old_fashioned',
            timestamp: '2023-10-05T14:50:00.000Z',
        },
        // ... more analytics data
    ],
};
