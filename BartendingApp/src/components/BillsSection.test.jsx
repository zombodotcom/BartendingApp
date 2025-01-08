// src/components/BillsSection.test.jsx
import { render, screen, within } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { BillsSection } from "./BillsSection.jsx";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ToastContext } from "../context/ToastContext.jsx"; // Import the context

describe("BillsSection Component", () => {
  const mockSetBills = vi.fn();
  const mockShowToast = vi.fn();

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

  const sampleBills = [
    {
      id: 1,
      name: "Bill #1",
      items: [],
    },
  ];

  beforeEach(() => {
    render(
      <ToastContext.Provider value={{ showToast: mockShowToast }}>
        <BillsSection
          bills={sampleBills}
          setBills={mockSetBills}
          recipes={sampleRecipes}
          bgClass="bg-secondary text-white"
        />
      </ToastContext.Provider>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("opens and closes the Add Bill modal", async () => {
    const user = userEvent.setup();

    // Click the "Create New Bill" button
    const createButton = screen.getByText("Create New Bill");
    await user.click(createButton);

    // Modal should be visible
    expect(screen.getByText("Create New Bill")).toBeInTheDocument();

    // Close the modal by clicking "Cancel"
    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByText("Create New Bill")).not.toBeInTheDocument();
  });

  it("adds a new bill successfully", async () => {
    const user = userEvent.setup();

    // Open Add Bill Modal
    const createButton = screen.getByText("Create New Bill");
    await user.click(createButton);

    // Enter bill name
    const billNameInput = screen.getByPlaceholderText("Enter bill name");
    await user.type(billNameInput, "Bill #2");

    // Click "Add Bill"
    const addButton = screen.getByText("Add Bill");
    await user.click(addButton);

    // Check that setBills was called with the new bill
    expect(mockSetBills).toHaveBeenCalledWith([
      ...sampleBills,
      {
        id: expect.any(Number),
        name: "Bill #2",
        items: [],
      },
    ]);

    // Check that a success toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "Success",
      `Bill "Bill #2" created successfully.`,
      3000
    );
  });

  it("prevents adding a bill without a name", async () => {
    const user = userEvent.setup();

    // Open Add Bill Modal
    const createButton = screen.getByText("Create New Bill");
    await user.click(createButton);

    // Click "Add Bill" without entering a name
    const addButton = screen.getByText("Add Bill");
    await user.click(addButton);

    // Check that setBills was not called
    expect(mockSetBills).not.toHaveBeenCalled();

    // Check that an error toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "Error",
      "Bill name cannot be empty.",
      3000
    );
  });

  it("adds a recipe to a bill successfully", async () => {
    const user = userEvent.setup();

    // Select a recipe from the dropdown
    const select = screen.getByLabelText("Select recipe for bill Bill #1");
    await user.selectOptions(select, "Margarita");

    // Click "Add Recipe"
    const addRecipeButton = screen.getByRole("button", {
      name: `Add recipe Margarita to bill Bill #1`,
    });
    await user.click(addRecipeButton);

    // Check that setBills was called with the updated bill
    expect(mockSetBills).toHaveBeenCalledWith([
      {
        id: 1,
        name: "Bill #1",
        items: [
          {
            name: "Margarita",
            price: 10.0,
            ingredients: sampleRecipes.Margarita.ingredients,
          },
        ],
      },
    ]);

    // Check that a success toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "Success",
      `Added "Margarita" to "Bill #1".`,
      3000
    );
  });

  it("prevents adding a recipe without selection", async () => {
    const user = userEvent.setup();

    // Click "Add Recipe" without selecting
    const addRecipeButton = screen.getByRole("button", {
      name: `Add recipe  to bill Bill #1`,
    });
    await user.click(addRecipeButton);

    // Check that setBills was not called
    expect(mockSetBills).not.toHaveBeenCalled();

    // Check that an error toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "Error",
      "Please select a recipe to add.",
      3000
    );
  });

  it("removes an item from a bill successfully", async () => {
    const user = userEvent.setup();

    // First, simulate adding an item to the bill
    mockSetBills.mockImplementation((updatedBills) => {
      // Update the bills array
      sampleBills[0].items.push({
        name: "Margarita",
        price: 10.0,
        ingredients: sampleRecipes.Margarita.ingredients,
      });
    });

    // Select and add the recipe
    const select = screen.getByLabelText("Select recipe for bill Bill #1");
    await user.selectOptions(select, "Margarita");
    const addRecipeButton = screen.getByRole("button", {
      name: `Add recipe Margarita to bill Bill #1`,
    });
    await user.click(addRecipeButton);

    // Now, the item should appear in the bill
    expect(screen.getByText("Margarita")).toBeInTheDocument();

    // Click the "Remove" button on the item
    const removeButtons = screen.getAllByRole("button", {
      name: /Remove item Margarita from bill Bill #1/i,
    });
    const removeButton = removeButtons[0]; // Assuming the first one is the item remove button
    await user.click(removeButton);

    // Wait for the modal to appear
    const modal = screen.getByRole("dialog", { name: /Remove Item/i });
    const withinModal = within(modal);

    // Confirm removal in the modal
    const confirmRemoveButton = withinModal.getByRole("button", {
      name: /Remove/i,
    });
    await user.click(confirmRemoveButton);

    // Check that setBills was called to remove the item
    expect(mockSetBills).toHaveBeenCalledWith([
      {
        id: 1,
        name: "Bill #1",
        items: [],
      },
    ]);

    // Check that a success toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "Success",
      `Removed "Margarita" from the bill.`,
      3000
    );
  });
});
