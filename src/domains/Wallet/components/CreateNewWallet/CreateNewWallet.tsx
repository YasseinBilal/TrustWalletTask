import React from 'react';
import { useDispatch } from 'react-redux';

import { addNewWallet } from '../../../../storage';
import { EnterPasswordForm } from '../EnterPasswordForm';
import { addWallet } from '../../../../store/store';
import { Layout } from '../../../../ui-kit/Layout';

type Props = {
  onBack: () => void;
  onWalletCreated: () => void;
};

export function CreateNewWallet({ onBack, onWalletCreated }: Props) {
  const dispatch = useDispatch();

  const onPasswordConfirmed = async (password: string) => {
    const newWallet = await addNewWallet(password);
    dispatch(addWallet(newWallet));
    onWalletCreated();
  };

  return (
    <Layout>
      <p>Please enter your password to create a new wallet</p>
      <EnterPasswordForm
        onPasswordConfirmed={onPasswordConfirmed}
        onBack={onBack}
      />
    </Layout>
  );
}
