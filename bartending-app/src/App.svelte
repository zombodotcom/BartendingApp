<!-- src/App.svelte -->
<script>
  import { Router, Route, Link } from "svelte-routing";
  import Inventory from "./components/Inventory.svelte";
  import Recipes from "./components/Recipes.svelte";
  import Favorites from "./components/Favorites.svelte";
  import ExportImport from "./components/ExportImport.svelte";
  import Modal from "./components/Modal.svelte";
  import ThemeToggle from "./components/ThemeToggle.svelte";
  import { isModalOpen } from "./stores.js";
</script>

<nav>
  <div>
    <Link to="/">Inventory</Link>
    <Link to="/recipes">Recipes</Link>
    <Link to="/favorites">Favorites</Link>
    <Link to="/export-import">Export/Import</Link>
  </div>
  <ThemeToggle />
</nav>

<Router>
  <main>
    <Route path="/" component={Inventory} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/export-import" component={ExportImport} />
  </main>
</Router>

{#if $isModalOpen}
  <Modal />
{/if}

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--secondary-color);
    padding: 1rem;
  }
  nav a {
    color: white;
    margin-right: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  nav a:hover {
    text-decoration: underline;
  }
  main {
    padding: 1rem;
  }
</style>
