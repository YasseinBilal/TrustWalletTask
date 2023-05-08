import React from 'react';

import styles from './GenerateWallet.module.css';
import { Layout } from '../../../../ui-kit/Layout';

type Props = {
  onGenerateClick: () => void;
};

export const GenerateWallet = ({ onGenerateClick }: Props) => {
  return (
    <Layout>
      <p className={styles.title}>
        Create a new password to generate a new wallet!
      </p>
      <button className={styles.button} onClick={onGenerateClick}>
        Create new password
      </button>
    </Layout>
  );
};
