import { ethers } from 'ethers';
import { Wallet } from '../domains/Wallet/Wallet';

export const getWallets = (): Wallet[] => {
  return localStorage.getItem('wallets')
    ? JSON.parse(localStorage.getItem('wallets')!)
    : [];
};

export const getActiveWallet = () => {
  const wallets = getWallets();
  return wallets.find((wallet) => wallet.isActive);
};

export const setActiveWallet = (address: string) => {
  const wallets = getWallets().map((wallet) => ({
    ...wallet,
    isActive: address === wallet.address,
  }));

  localStorage.setItem('wallets', JSON.stringify(wallets));
};

export const addNewWallet = async (password: string): Promise<Wallet> => {
  const wallet = ethers.Wallet.createRandom();
  const encryptedWallet = await wallet.encrypt(password);
  const wallets = getWallets().map((wallet: Wallet) => ({
    ...wallet,
    isActive: false,
  }));

  const newWallet: Wallet = {
    address: wallet.address,
    publicKey: wallet.publicKey,
    encryptedWallet,
    isActive: true,
    name: `Wallet ${wallets.length + 1}`,
  };

  wallets.push(newWallet);

  localStorage.setItem('wallets', JSON.stringify(wallets));

  return newWallet;
};

export const isPasswordCorrect = (password: string): boolean => {
  const wallets: Wallet[] = getWallets();

  if (wallets.length === 0) return true;

  const { encryptedWallet } = wallets[0];

  try {
    return !!ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password);
  } catch (err) {
    return false;
  }
};

export const getPrivateKey = (password: string): string => {
  const activeWallet = getActiveWallet();

  if (activeWallet) {
    const decryptedWallet = ethers.Wallet.fromEncryptedJsonSync(
      activeWallet.encryptedWallet,
      password,
    );
    return decryptedWallet.privateKey;
  }

  return '';
};
