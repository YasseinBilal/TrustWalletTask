import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '../../../../ui-kit/Layout';
import {
  selectActiveNetwork,
  selectActiveWallet,
} from '../../../../store/store';
import styles from './WalletHome.module.css';
import { getWalletBalance } from '../../api';
import { Network } from '../../../Network/Network';
import { getCurrency } from '../../../Network/helpers/getCurrency';

type Props = {
  onAddNewWalletClicked: () => void;
  onShowPrivateKeyClicked: () => void;
};

export const WalletHome = ({
  onAddNewWalletClicked,
  onShowPrivateKeyClicked,
}: Props) => {
  const [balance, setBalance] = useState('');
  const activeWallet = useSelector(selectActiveWallet);
  const activeNetwork = useSelector(selectActiveNetwork);
  const currency = getCurrency(activeNetwork);

  useEffect(() => {
    if (activeWallet && activeNetwork) {
      getWalletBalance({
        address: activeWallet,
        network: activeNetwork as Network,
      }).then((balance) => setBalance(balance));
    }
  }, [activeWallet, activeNetwork]);

  return (
    <Layout>
      <div className={styles.container}>
        <div>
          <span className={styles.label}>Address</span>
          <p>{activeWallet}</p>
        </div>
        <p>
          <span className={styles.label}>Balance</span>: {balance} {currency}
        </p>
        <div>
          <button onClick={onAddNewWalletClicked} className={styles.button}>
            Add new wallet
          </button>
          <button onClick={onShowPrivateKeyClicked} className={styles.button}>
            Show Private Key
          </button>
        </div>
      </div>
    </Layout>
  );
};
