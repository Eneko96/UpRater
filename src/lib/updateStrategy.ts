interface UpdateStrategyOptions {
  return_new: boolean;
}

export interface UpdateStrategyOptionsMap {
  [key: string]: UpdateStrategyOptions;
}

export const UPDATE_STRATEGY_OPTIONS: UpdateStrategyOptionsMap = {
  Comment: {
    return_new: false,
  },
  Rate: {
    return_new: true,
  },
};
