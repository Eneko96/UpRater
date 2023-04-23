import { create } from 'zustand';

type Rate = {
  _id: string;
  comment: string;
  value: number;
  profile_from: string[];
  user_to: string;
  user_from: string;
  created_at: string;
};

interface RateStore {
  rates: Rate[];
  setRates: (rates: Rate[]) => void;
}

export const useRates = create<RateStore>((set) => ({
  rates: [],
  setRates: (rates: Rate[]) => set({ rates }),
}));
