import { create } from 'zustand';

type ProfileFrom = {
  username: string;
};
export interface IRate {
  comment: string;
  value: number;
  anon: boolean;
  created_at: string;
  _id: number;
  profile_from: ProfileFrom;
  comments_count: number;
  user_from: string;
}

interface RateStore {
  rates: IRate[];
  setRates: (rates: IRate[]) => void;
}

export const useRates = create<RateStore>((set) => ({
  rates: [],
  setRates: (rates: IRate[]) => set({ rates }),
}));
