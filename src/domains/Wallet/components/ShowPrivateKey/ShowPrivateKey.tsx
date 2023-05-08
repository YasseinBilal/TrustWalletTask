import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './ShowPrivateKey.module.css';
import { getPrivateKey } from '../../../../storage';
import { EnterPasswordForm } from '../EnterPasswordForm';
import { Layout } from '../../../../ui-kit/Layout';
import { selectActiveWallet } from '../../../../store/store';

type Props = {
  onBack: () => void;
};

export function ShowPrivateKey({ onBack }: Props) {
  const [privateKey, setPrivateKey] = useState('');
  const activeWallet = useSelector(selectActiveWallet);

  useEffect(() => {
    setPrivateKey('');
  }, [activeWallet]);

  const onPasswordConfirmed = (password: string) => {
    setPrivateKey(getPrivateKey(password));
  };

  return (
    <Layout>
      <p>Please enter your password to show private key</p>
      <EnterPasswordForm
        onPasswordConfirmed={onPasswordConfirmed}
        onBack={onBack}
      />
      {privateKey && (
        <p>
          <div className={styles.label}>Private Key:</div>
          {privateKey}
        </p>
      )}
    </Layout>
  );
}
