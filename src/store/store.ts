import { configureStore } from '@reduxjs/toolkit';
import { Wallet } from '../domains/Wallet/Wallet';
import { walletSlice } from './wallet.slice';
import { networkSlice } from './network.slice';

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    network: networkSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectActiveWallet = (state: RootState): string =>
  state.wallet.wallets.find((wallet) => wallet.isActive)?.address || '';

export const selectWallets = (state: RootState): Wallet[] =>
  state.wallet.wallets;

export const selectActiveNetwork = (state: RootState) =>
  state.network.activeNetwork;

export const { setActiveNetwork } = networkSlice.actions;
export const { setActiveWallet, setWallets, addWallet } = walletSlice.actions;
