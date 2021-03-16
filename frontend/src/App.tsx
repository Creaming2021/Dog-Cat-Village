import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import Control from './components/submain/control/control';

function App() {
  return (
    <div className={styles.app}>
      <Route path="/" component={Control}/>
      {/* <Route path="/user" component={User}/>
      <Route path="/center" component={Center}/> */}
    </div>
  );
}

export default App;