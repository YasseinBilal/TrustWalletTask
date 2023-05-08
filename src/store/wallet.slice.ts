import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from '../domains/Wallet/Wallet';

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallets: [] as Wallet[],
  },
  reducers: {
    setActiveWallet: (state, action: PayloadAction<string>) => {
      state.wallets = state.wallets.map((wallet) => ({
        ...wallet,
        isActive: wallet.address === action.payload,
      }));
    },
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = action.payload;
    },
    addWallet: (state, action: PayloadAction<Wallet>) => {
      const wallets = state.wallets.map((wallet) => ({
        ...wallet,
        isActive: false,
      }));
      state.wallets = [...wallets, action.payload];
    },
  },
});

export const { setActiveWallet, setWallets, addWallet } = walletSlice.actions;
