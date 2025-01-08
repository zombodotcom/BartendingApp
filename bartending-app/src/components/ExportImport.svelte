<!-- src/components/ExportImport.svelte -->
<script>
  import { closeModalWindow } from "../stores.js";
  import { onMount } from "svelte";
</script>

<div class="export-import-container">
  <h2>Export/Import</h2>
  <p>Here you can export your data or import data from a file.</p>
  <button
    on:click={() => {
      /* Implement export functionality */
    }}>Export Data</button
  >
  <button
    on:click={() => {
      /* Implement import functionality */
    }}>Import Data</button
  >
</div>

<style>
  .export-import-container {
    padding: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 1rem;
  }
</style>
