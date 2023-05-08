import { Network } from '../Network';
import { ethers } from 'ethers';
import { notReachable } from '../../../utils/notReachable';

export const getProvider = (network: Network = 'eth_mainnet') => {
  switch (network) {
    case 'eth_mainnet':
      return new ethers.InfuraProvider('mainnet');
    case 'eth_goerli':
      return new ethers.InfuraProvider('goerli');
    case 'bnb_mainnet':
      return new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    case 'bnb_testnet':
      return new ethers.JsonRpcProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545',
      );
    default:
      return notReachable(network);
  }
};
