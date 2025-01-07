// src/components/OpenBillsSection.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

/**
 * A component that displays the "Open Bills" UI:
 *  - A list of bills
 *  - Create new bill
 *  - Reset single bill / all bills
 *  - Add a drink to a chosen bill
 *
 * Props:
 *  - bills: Array<{ id: number, drinks: Array<{ name: string, price: number }> }>
 *  - setBills: Function to update bills
 *  - bgClass: string for styling
 *  - removeDrinkFromBill: Function to remove a drink from a bill
 */
export function OpenBillsSection({
  bills,
  setBills,
  bgClass,
  removeDrinkFromBill,
}) {
  // State for the form inputs
  const [selectedBillId, setSelectedBillId] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState("");

  // Create a new bill with a unique id
  function createNewBill() {
    const newId =
      bills.length > 0 ? Math.max(...bills.map((b) => b.id)) + 1 : 1;
    const newBill = { id: newId, drinks: [] };
    setBills([...bills, newBill]);
  }

  // Add a drink to a bill by ID
  function addDrinkToBill(billId, name, price) {
    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        return {
          ...bill,
          drinks: [...bill.drinks, { name, price }],
        };
      }
      return bill;
    });
    setBills(updatedBills);
  }

  // Handle form submission for adding a drink
  function handleAddDrink(e) {
    e.preventDefault();
    if (!selectedBillId || !drinkName.trim()) {
      alert("Please select a bill and enter a drink name.");
      return;
    }
    const billId = parseInt(selectedBillId);
    const price = parseFloat(drinkPrice) || 0;
    addDrinkToBill(billId, drinkName.trim(), price);
    setDrinkName("");
    setDrinkPrice("");
  }

  // Reset a single bill
  function resetBill(billId) {
    const updatedBills = bills.map((bill) => {
      if (bill.id === billId) {
        return { ...bill, drinks: [] };
      }
      return bill;
    });
    setBills(updatedBills);
  }

  // Reset all bills
  function resetAllBills() {
    if (window.confirm("Are you sure you want to reset all bills?")) {
      setBills([]);
    }
  }

  return (
    <section class={`p-3 mb-5 rounded ${bgClass}`}>
      <h2 class="mb-3">Open Bills</h2>

      {/* Buttons to create a new bill and reset all bills */}
      <div class="mb-3">
        <button class="btn btn-primary me-2" onClick={createNewBill}>
          + Create New Bill
        </button>
        <button class="btn btn-danger" onClick={resetAllBills}>
          Reset All Bills
        </button>
      </div>

      {bills.length === 0 ? (
        <p>No open bills yet.</p>
      ) : (
        <div>
          {/* List of open bills */}
          {bills.map((bill) => (
            <div key={bill.id} class="card mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  Bill #{bill.id}
                  <button
                    class="btn btn-sm btn-outline-danger float-end"
                    onClick={() => resetBill(bill.id)}
                  >
                    Reset Bill
                  </button>
                </h3>
                <ul class="list-unstyled">
                  {bill.drinks.length === 0 && <li>No drinks added yet.</li>}
                  {bill.drinks.map((drink, idx) => (
                    <li
                      key={idx}
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {drink.name} - ${drink.price.toFixed(2)}
                      </span>
                      <button
                        class="btn btn-sm btn-link text-danger"
                        onClick={() => removeDrinkFromBill(bill.id, idx)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Form to add a new drink to a chosen bill */}
          <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Add a Drink to a Bill</h4>
              <form onSubmit={handleAddDrink} class="row g-3">
                <div class="col-md-4">
                  <label class="form-label">Select Bill:</label>
                  <select
                    class="form-select"
                    value={selectedBillId}
                    onChange={(e) => setSelectedBillId(e.target.value)}
                  >
                    <option value="">-- Choose a bill --</option>
                    {bills.map((bill) => (
                      <option key={bill.id} value={bill.id}>
                        Bill #{bill.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Drink Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. Old Fashioned"
                    value={drinkName}
                    onInput={(e) => setDrinkName(e.target.value)}
                  />
                </div>
                <div class="col-md-2">
                  <label class="form-label">Price:</label>
                  <input
                    type="number"
                    step="0.01"
                    class="form-control"
                    placeholder="0.00"
                    value={drinkPrice}
                    onInput={(e) => setDrinkPrice(e.target.value)}
                  />
                </div>
                <div class="col-md-2 align-self-end">
                  <button type="submit" class="btn btn-success w-100">
                    Add Drink
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
