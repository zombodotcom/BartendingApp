// src/components/orders/OrderList.jsx
import { h } from "preact";
import OrderItem from "./OrderItem.jsx";

export default function OrderList({ orders, updateOrderStatus, deleteOrder }) {
  if (orders.length === 0) {
    return <p>No active orders at the moment.</p>;
  }

  return (
    <div class="mt-6">
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          updateOrderStatus={updateOrderStatus}
          deleteOrder={deleteOrder}
        />
      ))}
    </div>
  );
}
