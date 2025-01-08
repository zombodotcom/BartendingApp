// src/context/AuthContext.jsx
import { createContext } from "preact";

export const AuthContext = createContext({
  user: null,
  login: (credentials) => {},
  logout: () => {},
});
