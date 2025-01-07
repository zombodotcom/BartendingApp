// src/components/ManageRecipesSection.test.jsx
import { render, screen, within } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { ManageRecipesSection } from "./ManageRecipesSection.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("ManageRecipesSection Component", () => {
  const mockAddNewRecipe = vi.fn();
  const mockRemoveRecipe = vi.fn();
  const mockUpdateRecipeIngredients = vi.fn();

  const sampleRecipes = {
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
  };

  beforeEach(() => {
    render(
      <ManageRecipesSection
        recipes={sampleRecipes}
        addNewRecipe={mockAddNewRecipe}
        removeRecipe={mockRemoveRecipe}
        updateRecipeIngredients={mockUpdateRecipeIngredients}
        bgClass="bg-secondary text-white"
      />
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders existing recipes with their prices and ingredients", () => {
    // Check for recipe names and prices using regex for precise matching
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();
    expect(screen.getByText("OldFashioned")).toBeInTheDocument();
    expect(screen.getByText(/\$8\.50/)).toBeInTheDocument();

    // Check for ingredients
    expect(screen.getByText("Tequila - 2 oz")).toBeInTheDocument();
    expect(screen.getByText("TripleSec - 1 oz")).toBeInTheDocument();
    expect(screen.getByText("LimeJuice - 1 oz")).toBeInTheDocument();
    expect(screen.getByText("Salt - for rimming")).toBeInTheDocument();
    expect(screen.getByText("Bourbon - 2 oz")).toBeInTheDocument();
    expect(screen.getByText("Sugar - 1 cube")).toBeInTheDocument();
    expect(screen.getByText("AngosturaBitters - 2 dashes")).toBeInTheDocument();
    expect(screen.getByText("Water - dash")).toBeInTheDocument();
  });

  it("adds a new recipe when the form is submitted", async () => {
    const user = userEvent.setup();

    // Fill in the recipe name and price
    const nameInput = screen.getByPlaceholderText("e.g. Margarita");
    const priceInput = screen.getByPlaceholderText("e.g. 10.00");
    const addButton = screen.getByRole("button", { name: /add recipe/i });

    await user.type(nameInput, "Mojito");
    await user.type(priceInput, "12.50");

    // Submit the form
    await user.click(addButton);

    // Check if addNewRecipe was called with correct arguments
    expect(mockAddNewRecipe).toHaveBeenCalledWith("Mojito", 12.5);
  });

  it("does not add a recipe with an existing name", async () => {
    const user = userEvent.setup();

    // Fill in the recipe name that already exists
    const nameInput = screen.getByPlaceholderText("e.g. Margarita");
    const priceInput = screen.getByPlaceholderText("e.g. 10.00");
    const addButton = screen.getByRole("button", { name: /add recipe/i });

    await user.type(nameInput, "Margarita");
    await user.type(priceInput, "11.00");

    // Mock window.alert
    vi.spyOn(window, "alert").mockImplementation(() => {});

    // Submit the form
    await user.click(addButton);

    // Check if alert was called
    expect(window.alert).toHaveBeenCalledWith("Recipe already exists.");

    // Ensure addNewRecipe was not called
    expect(mockAddNewRecipe).not.toHaveBeenCalled();
  });

  it("removes a recipe when the remove button is clicked", async () => {
    const user = userEvent.setup();

    // Find the remove button for 'Margarita'
    const removeButtons = screen.getAllByRole("button", {
      name: /remove recipe/i,
    });
    const margaritaRemoveButton = removeButtons.find((button) =>
      button
        .closest(".card")
        .querySelector(".card-title")
        .textContent.includes("Margarita")
    );

    // Mock window.confirm
    vi.spyOn(window, "confirm").mockReturnValue(true);

    // Click the remove button
    await user.click(margaritaRemoveButton);

    // Check if window.confirm was called
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to remove the recipe "Margarita"? This action cannot be undone.'
    );

    // Check if removeRecipe was called with 'Margarita'
    expect(mockRemoveRecipe).toHaveBeenCalledWith("Margarita");
  });

  it("adds an ingredient to a recipe", async () => {
    const user = userEvent.setup();

    // Find the 'Add' button for Margarita's ingredients
    const margaritaCard = screen.getByText("Margarita").closest(".card");
    const ingredientNameInput =
      within(margaritaCard).getByPlaceholderText("Ingredient Name");
    const ingredientAmountInput = within(margaritaCard).getByPlaceholderText(
      "Amount (e.g., 2 oz)"
    );
    const addIngredientButton = within(margaritaCard).getByRole("button", {
      name: /add/i,
    });

    // Fill in the ingredient details
    await user.type(ingredientNameInput, "OrangeJuice");
    await user.type(ingredientAmountInput, "0.5 oz");

    // Submit the form
    await user.click(addIngredientButton);

    // Check if updateRecipeIngredients was called correctly
    expect(mockUpdateRecipeIngredients).toHaveBeenCalledWith(
      "Margarita",
      "OrangeJuice",
      "0.5 oz",
      "add"
    );
  });

  it("removes an ingredient from a recipe", async () => {
    const user = userEvent.setup();

    // Find the remove button for 'Tequila - 2 oz' in Margarita
    const margaritaCard = screen.getByText("Margarita").closest(".card");
    const tequilaText = within(margaritaCard).getByText("Tequila - 2 oz");
    const tequilaListItem = tequilaText.closest("li");
    const removeTequilaButton = within(tequilaListItem).getByRole("button", {
      name: /remove/i,
    });

    // Mock window.confirm
    vi.spyOn(window, "confirm").mockReturnValue(true);

    // Click the remove button
    await user.click(removeTequilaButton);

    // Check if window.confirm was called with the correct message
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to remove the ingredient "Tequila" from recipe "Margarita"?'
    );

    // Check if updateRecipeIngredients was called correctly
    expect(mockUpdateRecipeIngredients).toHaveBeenCalledWith(
      "Margarita",
      "Tequila",
      null,
      "remove"
    );
  });

  it("displays message when there are no recipes", () => {
    // Re-render the component with empty recipes
    render(
      <ManageRecipesSection
        recipes={{}}
        addNewRecipe={mockAddNewRecipe}
        removeRecipe={mockRemoveRecipe}
        updateRecipeIngredients={mockUpdateRecipeIngredients}
        bgClass="bg-secondary text-white"
      />
    );

    expect(screen.getByText("No recipes available.")).toBeInTheDocument();
  });
});
