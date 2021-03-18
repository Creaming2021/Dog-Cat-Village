import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import UserContainer from './containers/user_container';

function App() {
  return (
    <div className={styles.app}>
      <Route path="/" component={UserContainer} exact/>
      {/* <Route path="/user" component={User}/>
      <Route path="/center" component={Center}/> */}
    </div>
  );
}

export default App;