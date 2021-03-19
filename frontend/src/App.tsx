import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import SubMain from './components/user/main/subMain/subMain';
import UserContainer from './containers/user_container';

function App() {
  return (
    <div className={styles.app}>
      <Route path="/" component={UserContainer} exact/>
      <Route path="/user" exact/>
      <Route path="/center" component={SubMain}/>
      {/* <Route path="/user" component={User}/>
      <Route path="/center" component={Center}/> */}
    </div>
  );
}

export default App;