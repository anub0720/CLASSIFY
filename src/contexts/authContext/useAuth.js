// useAuth.js
import { useContext, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext };
