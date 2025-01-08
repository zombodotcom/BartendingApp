<!-- src/components/Inventory.svelte -->
<script>
  import { alcohols, openModalWindow } from "../stores.js";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  let currentAlcohols = [];

  const unsubscribe = alcohols.subscribe((value) => {
    currentAlcohols = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });

  const deleteAlcohol = (id) => {
    if (confirm("Are you sure you want to delete this alcohol?")) {
      alcohols.update((currentData) =>
        currentData.filter((alcohol) => alcohol.id !== id)
      );
    }
  };

  const editAlcohol = (id) => {
    openModalWindow("edit-alcohol", id);
  };

  const addAlcohol = () => {
    openModalWindow("add-alcohol");
  };
</script>

<div class="inventory-container">
  <h2>Inventory</h2>
  <button class="add-btn" on:click={addAlcohol}>Add Alcohol</button>
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Category</th>
        <th>Brand</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each currentAlcohols as alcohol}
        <tr>
          <td data-label="Type">{alcohol.type}</td>
          <td data-label="Category">{alcohol.category}</td>
          <td data-label="Brand">{alcohol.brand}</td>
          <td data-label="Quantity">{alcohol.quantity}</td>
          <td data-label="Unit">{alcohol.unit}</td>
          <td data-label="Description">{alcohol.description}</td>
          <td data-label="Actions">
            <button class="edit-btn" on:click={() => editAlcohol(alcohol.id)}
              >Edit</button
            >
            <button
              class="delete-btn"
              on:click={() => deleteAlcohol(alcohol.id)}>Delete</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .inventory-container {
    padding: 1rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
  button {
    margin-right: 0.5rem;
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .edit-btn {
    background-color: #008cba;
    color: white;
  }
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  .add-btn {
    background-color: #4caf50;
    color: white;
    margin-bottom: 1rem;
  }
</style>
