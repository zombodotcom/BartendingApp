export const initialBarData = {
    alcoholTypes: {
        Whiskey: ["Rail", "Jack Daniels", "Jameson", "Maker's Mark", "Bullet Bourbon"],
        Vodka: ["Rail", "Titos", "Grey Goose"],
        Gin: ["Rail", "Beefeater", "Tanqueray"],
    },
    mixers: {
        Soda: ["Club Soda", "Tonic Water", "Cola"],
    },
    garnishes: {
        Fruits: ["Orange Slice", "Lime Wedge"],
    },
    recipes: {
        "Old Fashioned": {
            ingredients: { Whiskey: "2 oz", Sugar: "1 tsp", Bitters: "2 dashes" },
            price: 10.0,
        },
        "Vodka Tonic": {
            ingredients: { Vodka: "1.5 oz", "Tonic Water": "4 oz", Lime: "1 wedge" },
            price: 8.0,
        },
    },
};
