import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Network } from '../domains/Network/Network';

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    activeNetwork: 'eth_mainnet' as Network,
  },
  reducers: {
    setActiveNetwork: (state, action: PayloadAction<Network>) => {
      state.activeNetwork = action.payload;
    },
  },
});
