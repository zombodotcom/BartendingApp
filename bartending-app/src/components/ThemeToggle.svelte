<!-- src/components/ThemeToggle.svelte -->
<script>
  import { theme } from "../stores.js";
  import { get } from "svelte/store";

  const toggleTheme = () => {
    theme.update((current) => (current === "light" ? "dark" : "light"));
  };
</script>

<button on:click={toggleTheme} aria-label="Toggle Theme">
  {$theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>

<style>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--text-color);
  }
</style>
