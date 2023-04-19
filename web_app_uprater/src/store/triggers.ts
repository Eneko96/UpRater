import { create } from 'zustand';

const defaultTrigger = {
  createRate: false,
  notification: false,
};

type Triggers = typeof defaultTrigger;

interface TriggerStore {
  triggers: typeof defaultTrigger;
  setTriggers: (triggers: Triggers) => void;
}

export const useTriggers = create<TriggerStore>((set) => ({
  triggers: defaultTrigger,
  setTriggers: (triggers: Triggers) => set({ triggers }),
}));
