import React from 'react';
import styles from './App.module.css';

import Wallet from './components/wallet/wallet';

function App() {
  return (
    <div className={styles.app}>
      <h1>마지막 블록체인</h1>
      <Wallet />
    </div>
  );
}

export default App;