import React, { useState } from 'react';

import { Dropdown } from '../../../../ui-kit/Dropdown';
import { Network } from '../../Network';

const networks = [
  { name: 'ETH Mainnet', value: 'eth_mainnet' },
  { name: 'ETH Goerli', value: 'eth_goerli' },
  { name: 'BNB Mainnet', value: 'bnb_mainnet' },
  { name: 'BNB Testnet', value: 'bnb_testnet' },
];

type Props = {
  onChange: (network: Network) => void;
};

export const NetworkSelector = ({ onChange }: Props) => {
  const [activeNetwork, setActiveNetwork] = useState(networks[0]);

  return (
    <Dropdown
      selectedOption={activeNetwork}
      options={networks}
      onChange={(option) => {
        onChange(option.value as Network);
        setActiveNetwork(option);
      }}
    />
  );
};
