import { ethers } from 'ethers';
import { getProvider } from '../../Network/api';
import { Network } from '../../Network/Network';

type Params = {
  address: string;
  network: Network;
};

export const getWalletBalance = async ({
  address,
  network,
}: Params): Promise<string> => {
  const provider = getProvider(network);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
};
