import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import SubMain from './components/user/main/subMain/subMain';
import UserContainer from './containers/user_container';
import MyPage from './components/myPage/myPage';
import UserMainPage from './components/userMainPage/userMainPage';

function App() {
  return (
    <div className={styles.app}>
      <Route path="/" component={UserContainer} exact/>
      <Route path="/user" component={MyPage} exact/>
      <Route path="/shelter" component={SubMain} exact/>
      <Route path="/user/main" component={UserMainPage}/>
      {/* <Route path="/user" component={User}/>
      <Route path="/center" component={Center}/> */}
    </div>
  );
}

export default App;