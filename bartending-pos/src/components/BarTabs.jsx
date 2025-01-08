// src/components/BarTabs.jsx
import { h } from "preact";
import { useState } from "preact/hooks";
import OrdersPage from "../pages/OrdersPage.jsx";
import InventoryPage from "../pages/InventoryPage.jsx";
import ReportsPage from "../pages/ReportsPage.jsx";

export function BarTabs({ barData, setBarData }) {
  const [currentTab, setCurrentTab] = useState("orders");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      {/* Sub-Tab Navigation */}
      <nav class="flex border-b">
        <button
          class={`px-4 py-2 -mb-px font-semibold text-sm ${
            currentTab === "orders"
              ? "border-l border-t border-r rounded-t text-blue-700"
              : "text-gray-500 hover:text-blue-700"
          }`}
          onClick={() => handleTabClick("orders")}
        >
          Orders
        </button>
        <button
          class={`px-4 py-2 -mb-px font-semibold text-sm ${
            currentTab === "inventory"
              ? "border-l border-t border-r rounded-t text-blue-700"
              : "text-gray-500 hover:text-blue-700"
          }`}
          onClick={() => handleTabClick("inventory")}
        >
          Inventory
        </button>
        <button
          class={`px-4 py-2 -mb-px font-semibold text-sm ${
            currentTab === "reports"
              ? "border-l border-t border-r rounded-t text-blue-700"
              : "text-gray-500 hover:text-blue-700"
          }`}
          onClick={() => handleTabClick("reports")}
        >
          Reports
        </button>
      </nav>

      {/* Sub-Tab Content */}
      <div class="p-4">
        {currentTab === "orders" && (
          <OrdersPage barData={barData} setBarData={setBarData} />
        )}
        {currentTab === "inventory" && (
          <InventoryPage barData={barData} setBarData={setBarData} />
        )}
        {currentTab === "reports" && (
          <ReportsPage barData={barData} setBarData={setBarData} />
        )}
      </div>
    </div>
  );
}
