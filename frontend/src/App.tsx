import React from 'react';
import styles from './App.module.css';
import DonationList from './components/donationList/donationList';
import UserInfo from './components/userInfo/userInfo';




function App() {
  return (
    <div className={styles.app}>
      <h1>마지막 블록체인</h1>
      <DonationList />
      <UserInfo />
    </div>
  );
}

export default App;