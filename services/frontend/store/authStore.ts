import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, Role, User } from "../types";

interface AuthStore extends AuthState {
  setAuth: (token: string, hospitalId: string, role: Role, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      hospitalId: null,
      role: null,
      user: null,
      setAuth: (token, hospitalId, role, user) =>
        set({ token, hospitalId, role, user }),
      clearAuth: () =>
        set({ token: null, hospitalId: null, role: null, user: null }),
    }),
    { name: "healthops-auth" }
  )
);
