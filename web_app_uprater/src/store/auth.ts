import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  csrf: string | null;
  setToken: (token: string) => void;
  setCsrf: (csrf: string) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: null,
  csrf: null,
  setToken: (token: string) => set({ token }),
  setCsrf: (csrf: string) => set({ csrf }),
}));
