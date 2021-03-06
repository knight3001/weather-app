import { IStore } from '../app/interfaces/IStore';

export const mockInitialStore: IStore = {
  current: {
    loading: false,
    data: null,
    error: null,
  },
  forecast: {
    loading: false,
    data: [],
    error: null,
  },
};
