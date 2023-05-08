import React from 'react';
import { useSelector } from 'react-redux';

import { Dropdown } from '../../../../ui-kit/Dropdown';
import { selectWallets } from '../../../../store/store';

type Props = {
  onChange: (walletAddress: string) => void;
};

export const WalletSelector = ({ onChange }: Props) => {
  const wallets = useSelector(selectWallets);
  const mappedWallets = wallets.map((wallet) => ({
    name: wallet.name,
    value: wallet.address,
    isActive: wallet.isActive,
  }));

  return (
    <Dropdown
      selectedOption={mappedWallets.find((wallet) => wallet.isActive)!}
      options={mappedWallets}
      onChange={(option) => {
        onChange(option.value);
      }}
    />
  );
};
