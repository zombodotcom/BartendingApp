<!-- src/components/Auth.svelte -->
<script>
  import { users, openModalWindow } from "../stores.js";
  import { get } from "svelte/store";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let username = "";
  let password = "";
  let isLogin = true;
  let error = "";

  const handleAuth = () => {
    if (isLogin) {
      const currentUsers = get(users);
      const user = currentUsers.find(
        (u) => u.username === username && u.passwordHash === password
      ); // Simplified
      if (user) {
        dispatch("login", user);
      } else {
        error = "Invalid credentials.";
      }
    } else {
      // Registration Logic
      const currentUsers = get(users);
      if (currentUsers.find((u) => u.username === username)) {
        error = "Username already exists.";
        return;
      }
      const newUser = {
        id: `user_${Date.now()}`,
        username,
        email: `${username}@example.com`,
        passwordHash: password, // Simplified; use hashing in production
        preferences: { theme: "light", language: "en" },
        favorites: { recipes: [], ingredients: [] },
      };
      users.update((n) => [...n, newUser]);
      dispatch("register", newUser);
    }
  };
</script>

<div class="auth-container">
  <h2>{isLogin ? "Login" : "Register"}</h2>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  <input type="text" placeholder="Username" bind:value={username} required />
  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    required
  />
  <button on:click={handleAuth}>{isLogin ? "Login" : "Register"}</button>
  <div
    class="toggle"
    on:click={() => {
      isLogin = !isLogin;
      error = "";
    }}
  >
    {isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login"}
  </div>
</div>

<style>
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .toggle {
    margin-top: 1rem;
    text-align: center;
    cursor: pointer;
    color: #008cba;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
</style>
