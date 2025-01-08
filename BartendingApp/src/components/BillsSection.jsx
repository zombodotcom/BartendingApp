// src/components/BillsSection.jsx
import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import { Modal } from "./Modal.jsx";
import { ToastContext } from "../context/ToastContext.jsx"; // Import the context

export function BillsSection({ bills, setBills, recipes, bgClass }) {
  const [newBillName, setNewBillName] = useState("");
  const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [currentBillId, setCurrentBillId] = useState(null);
  const [isDeleteBillModalOpen, setIsDeleteBillModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState({
    billId: null,
    itemIndex: null,
    itemName: "",
  });

  const { showToast } = useContext(ToastContext); // Use the context

  // Function to open Add Bill Modal
  function openAddBillModal() {
    setIsAddBillModalOpen(true);
  }

  // Function to close Add Bill Modal
  function closeAddBillModal() {
    setIsAddBillModalOpen(false);
    setNewBillName("");
  }

  // Function to add a new bill
  function addNewBill() {
    if (!newBillName.trim()) {
      // Trigger toast
      showToast("Error", "Bill name cannot be empty.", 3000);
      return;
    }
    const newBill = {
      id: Date.now(),
      name: newBillName.trim(),
      items: [],
    };
    setBills([...bills, newBill]);
    closeAddBillModal();
    showToast("Success", `Bill "${newBill.name}" created successfully.`, 3000);
  }

  // Function to open Delete Bill Modal
  function openDeleteBillModal(billId) {
    setCurrentBillId(billId);
    setIsDeleteBillModalOpen(true);
  }

  // Function to close Delete Bill Modal
  function closeDeleteBillModal() {
    setIsDeleteBillModalOpen(false);
    setCurrentBillId(null);
  }

  // Function to delete a bill
  function deleteBill() {
    const bill = bills.find((b) => b.id === currentBillId);
    const updatedBills = bills.filter((b) => b.id !== currentBillId);
    setBills(updatedBills);
    closeDeleteBillModal();
    showToast("Success", `Bill "${bill.name}" deleted successfully.`, 3000);
  }

  // Function to add a recipe to a bill
  function addRecipeToBill(billId, recipeName) {
    if (!recipes[recipeName]) {
      showToast("Error", "Selected recipe does not exist.", 3000);
      return;
    }

    const recipe = recipes[recipeName];

    // Check for duplicate recipe in the bill
    const bill = bills.find((b) => b.id === billId);
    if (bill.items.some((item) => item.name === recipeName)) {
      showToast("Error", "This recipe is already added to the bill.", 3000);
      return;
    }

    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        return {
          ...bill,
          items: [
            ...bill.items,
            {
              name: recipeName,
              price: recipe.price,
              ingredients: recipe.ingredients,
            },
          ],
        };
      }
      return bill;
    });

    setBills(updatedBills);
    showToast("Success", `Added "${recipeName}" to "${bill.name}".`, 3000);
  }

  // Function to open Remove Item Modal
  function openRemoveItemModal(billId, itemIndex, itemName) {
    setItemToRemove({ billId, itemIndex, itemName });
  }

  // Function to confirm removing an item
  function confirmRemoveItem() {
    const { billId, itemIndex, itemName } = itemToRemove;
    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        const updatedItems = bill.items.filter((_, idx) => idx !== itemIndex);
        return { ...bill, items: updatedItems };
      }
      return bill;
    });

    setBills(updatedBills);
    showToast("Success", `Removed "${itemName}" from the bill.`, 3000);
    setItemToRemove({ billId: null, itemIndex: null, itemName: "" });
  }

  // Function to handle Delete Bill button click
  function handleDeleteBillClick(billId) {
    openDeleteBillModal(billId);
  }

  // Function to handle Remove Item button click
  function handleRemoveItemClick(billId, itemIndex, itemName) {
    openRemoveItemModal(billId, itemIndex, itemName);
  }

  return (
    <section class={`p-3 mb-5 rounded ${bgClass}`}>
      <h2 class="mb-3">Manage Bills</h2>

      {/* Create New Bill Button */}
      <div class="mb-4">
        <button class="btn btn-primary" onClick={openAddBillModal}>
          Create New Bill
        </button>
      </div>

      {/* Add Bill Modal */}
      <Modal
        isOpen={isAddBillModalOpen}
        onClose={closeAddBillModal}
        title="Create New Bill"
      >
        <div class="mb-3">
          <label for="bill-name" class="form-label">
            Bill Name
          </label>
          <input
            type="text"
            class="form-control"
            id="bill-name"
            placeholder="Enter bill name"
            value={newBillName}
            onInput={(e) => setNewBillName(e.target.value)}
          />
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" onClick={closeAddBillModal}>
            Cancel
          </button>
          <button class="btn btn-primary" onClick={addNewBill}>
            Add Bill
          </button>
        </div>
      </Modal>

      {/* Delete Bill Modal */}
      <Modal
        isOpen={isDeleteBillModalOpen}
        onClose={closeDeleteBillModal}
        title="Delete Bill"
      >
        <p>
          Are you sure you want to delete this bill? This action cannot be
          undone.
        </p>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" onClick={closeDeleteBillModal}>
            Cancel
          </button>
          <button class="btn btn-danger" onClick={deleteBill}>
            Delete
          </button>
        </div>
      </Modal>

      {/* Remove Item Modal */}
      <Modal
        isOpen={itemToRemove.billId !== null}
        onClose={() =>
          setItemToRemove({ billId: null, itemIndex: null, itemName: "" })
        }
        title="Remove Item"
      >
        <p>
          Are you sure you want to remove "{itemToRemove.itemName}" from the
          bill?
        </p>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-secondary me-2"
            onClick={() =>
              setItemToRemove({ billId: null, itemIndex: null, itemName: "" })
            }
          >
            Cancel
          </button>
          <button class="btn btn-danger" onClick={confirmRemoveItem}>
            Remove
          </button>
        </div>
      </Modal>

      {/* Existing Bills */}
      <div>
        {bills.length === 0 ? (
          <p>No open bills. Create one above.</p>
        ) : (
          bills.map((bill) => (
            <div key={bill.id} class="card mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="card-title">{bill.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      Bill ID: {bill.id}
                    </h6>
                  </div>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteBillClick(bill.id)}
                  >
                    Delete Bill
                  </button>
                </div>

                {/* Add Recipe to Bill */}
                <div class="mb-3">
                  <label for={`recipe-select-${bill.id}`} class="form-label">
                    Add Recipe to Bill
                  </label>
                  <div class="input-group">
                    <select
                      id={`recipe-select-${bill.id}`}
                      class="form-select"
                      value={selectedRecipe}
                      onChange={(e) => setSelectedRecipe(e.target.value)}
                    >
                      <option value="">Select a recipe</option>
                      {Object.keys(recipes).map((recipeName) => (
                        <option key={recipeName} value={recipeName}>
                          {recipeName} - ${recipes[recipeName].price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <button
                      class="btn btn-success"
                      onClick={() => {
                        if (selectedRecipe) {
                          addRecipeToBill(bill.id, selectedRecipe);
                          setSelectedRecipe("");
                        } else {
                          showToast(
                            "Error",
                            "Please select a recipe to add.",
                            3000
                          );
                        }
                      }}
                    >
                      Add Recipe
                    </button>
                  </div>
                </div>

                {/* Bill Items */}
                {bill.items.length === 0 ? (
                  <p>No items added to this bill.</p>
                ) : (
                  <ul class="list-group mb-3">
                    {bill.items.map((item, index) => (
                      <li
                        key={index}
                        class="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{item.name}</strong> - $
                          {item.price.toFixed(2)}
                          <br />
                          <small>
                            Ingredients:{" "}
                            {Object.entries(item.ingredients).map(
                              ([ing, amt], idx) => (
                                <span key={ing}>
                                  {ing}: {amt}
                                  {idx <
                                  Object.entries(item.ingredients).length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              )
                            )}
                          </small>
                        </div>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleRemoveItemClick(bill.id, index, item.name)
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Total */}
                <h6>
                  Total: $
                  {bill.items
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}
                </h6>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
