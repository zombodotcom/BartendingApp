// src/components/ManageData.jsx
import { h } from "preact";
import { useState, useContext } from "preact/hooks";
import { ToastContext } from "../context/ToastContext.jsx";

export function ManageData({ barData, setBarData }) {
  const { showToast } = useContext(ToastContext);
  const [data, setData] = useState(barData);

  const handleSave = () => {
    // Implement save functionality
    setBarData(data);
    showToast("Success", "Data saved successfully.", 3000);
  };

  return (
    <div>
      <h2 class="text-xl font-semibold mb-4">Manage Data</h2>
      {/* Implement your data management UI here */}
      <p>This is a placeholder for the Manage Data component.</p>
      <button class="btn btn-primary mt-4" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
