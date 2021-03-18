import React from 'react';
import styles from './App.module.css';
import MyPage from './components/myPage/myPage';





function App() {
  return (
    <div className={styles.app}>
      <MyPage />
    </div>
  );
}

export default App;