import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../logo.png';

import {
  setActiveNetwork,
  setActiveWallet,
  setWallets,
  selectWallets,
} from '../../store/store';
import { NetworkSelector } from '../../domains/Network/components';
import { WalletSelector } from '../../domains/Wallet/components/WalletSelector';
import {
  setActiveWallet as storeActiveWallet,
  getWallets,
} from '../../storage';

import styles from './Header.module.css';

export const Header = () => {
  const dispatch = useDispatch();
  const wallets = useSelector(selectWallets);

  const storageWallets = getWallets();

  useEffect(() => {
    dispatch(setWallets(storageWallets));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <img src={logo} width='100' alt='Logo' />
      </div>
      {wallets.length > 0 ? (
        <div className={styles.dropdowns}>
          <div>
            <span className={styles.label}>Wallet</span>
            <WalletSelector
              onChange={(wallet: string) => {
                storeActiveWallet(wallet);
                dispatch(setActiveWallet(wallet));
              }}
            />
          </div>
          <div>
            <span className={styles.label}>Network</span>
            <NetworkSelector
              onChange={(network) => {
                dispatch(setActiveNetwork(network));
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
