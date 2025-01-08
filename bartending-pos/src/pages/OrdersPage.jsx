// src/pages/OrdersPage.jsx
import { h } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";
import { ToastContext } from "../context/ToastContext.jsx";
import OrderList from "../components/orders/OrderList.jsx";
import AddOrderForm from "../components/orders/AddOrderForm.jsx";

export default function OrdersPage({ barData, setBarData }) {
  const { showToast } = useContext(ToastContext);
  const [orders, setOrders] = useState(barData.orders || []);

  useEffect(() => {
    // Sync local orders state with barData
    setOrders(barData.orders || []);
  }, [barData.orders]);

  const addOrder = (order) => {
    const newOrder = {
      id: Date.now(), // Simple unique ID
      customerName: order.customerName,
      items: order.items, // Array of { recipeName, quantity }
      status: "Pending", // Default status
      createdAt: new Date().toISOString(),
    };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    setBarData({ ...barData, orders: updatedOrders });
    showToast("Success", `Order for "${order.customerName}" added.`, 3000);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setBarData({ ...barData, orders: updatedOrders });
    showToast("Success", `Order status updated to "${newStatus}".`, 3000);
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setBarData({ ...barData, orders: updatedOrders });
    showToast("Success", `Order deleted successfully.`, 3000);
  };

  return (
    <div>
      <h2 class="text-2xl font-semibold mb-4">Orders Management</h2>
      <AddOrderForm recipes={barData.recipes} addOrder={addOrder} />
      <OrderList
        orders={orders}
        updateOrderStatus={updateOrderStatus}
        deleteOrder={deleteOrder}
      />
    </div>
  );
}
