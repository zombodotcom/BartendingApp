// src/components/orders/OrderItem.jsx
import { h } from "preact";
import { useState } from "preact/hooks";

export default function OrderItem({ order, updateOrderStatus, deleteOrder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(order.status);

  const handleStatusChange = () => {
    updateOrderStatus(order.id, newStatus);
    setIsEditing(false);
  };

  return (
    <div class="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold">{order.customerName}</h3>
          <p class="text-sm text-gray-600">
            Order ID: {order.id} | Placed on:{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          {isEditing ? (
            <div class="flex items-center">
              <select
                class="border rounded px-2 py-1 mr-2"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Preparation">In Preparation</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                class="btn btn-success text-white mr-2"
                onClick={handleStatusChange}
              >
                Save
              </button>
              <button
                class="btn btn-secondary text-white"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div class="flex items-center">
              <span class={`px-2 py-1 rounded ${statusBadge(order.status)}`}>
                {order.status}
              </span>
              <button
                class="btn btn-outline-primary text-blue-700 ml-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                class="btn btn-outline-danger text-red-700 ml-2"
                onClick={() => deleteOrder(order.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-semibold">Items:</h4>
        <ul class="list-disc list-inside">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.recipeName} x{item.quantity} - ${item.totalPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div class="mt-4 text-right">
        <span class="font-semibold">Total: ${order.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function statusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-800";
    case "In Preparation":
      return "bg-blue-200 text-blue-800";
    case "Completed":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}
