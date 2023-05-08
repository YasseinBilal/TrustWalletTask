import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { WalletPage } from './domains/Wallet/features';
import { Header } from './ui-kit/Header';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <WalletPage />
    </Provider>
  );
}

export default App;
