import { Network } from '../Network';
import { notReachable } from '../../../utils/notReachable';

export const getCurrency = (network: Network) => {
  switch (network) {
    case 'eth_mainnet':
    case 'eth_goerli':
      return 'ETH';
    case 'bnb_mainnet':
    case 'bnb_testnet':
      return 'BNB';
    default:
      return notReachable(network);
  }
};
