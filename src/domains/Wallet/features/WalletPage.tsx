import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addWallet } from '../../../store/store';

import { notReachable } from '../../../utils/notReachable';
import {
  GenerateWallet,
  CreatePasswordForm,
  CreateNewWallet,
  ShowPrivateKey,
  WalletHome,
} from '../components';
import { addNewWallet, getActiveWallet } from '../../../storage';

type ViewState =
  | 'generate_wallet_view'
  | 'create_password_view'
  | 'create_wallet_view'
  | 'show_private_key_view'
  | 'wallet_home_view';

export const WalletPage = () => {
  const activeWallet = getActiveWallet();
  const [viewState, setViewState] = useState<ViewState>(
    activeWallet ? 'wallet_home_view' : 'generate_wallet_view',
  );
  const dispatch = useDispatch();

  const onPasswordCreated = async (password: string) => {
    const newWallet = await addNewWallet(password);
    dispatch(addWallet(newWallet));
    setViewState('wallet_home_view');
  };

  const openHomeView = () => setViewState('wallet_home_view');

  switch (viewState) {
    case 'generate_wallet_view':
      return (
        <GenerateWallet
          onGenerateClick={() => setViewState('create_password_view')}
        />
      );
    case 'create_password_view':
      return (
        <CreatePasswordForm
          onPasswordCreated={onPasswordCreated}
          onBack={() => setViewState('generate_wallet_view')}
        />
      );
    case 'create_wallet_view':
      return (
        <CreateNewWallet onWalletCreated={openHomeView} onBack={openHomeView} />
      );
    case 'show_private_key_view':
      return <ShowPrivateKey onBack={openHomeView} />;
    case 'wallet_home_view':
      return (
        <WalletHome
          onAddNewWalletClicked={() => setViewState('create_wallet_view')}
          onShowPrivateKeyClicked={() => setViewState('show_private_key_view')}
        />
      );
    default:
      return notReachable(viewState);
  }
};
