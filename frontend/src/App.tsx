import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.css';
import SubMain from './components/user/main/subMain/subMain';
import MemberContainer from './containers/memberContainer';
import MyPage from './components/myPage/myPage';
import StreamingListPage from './components/streamingListPage/streamingListPage';
import UserMainPage from './components/userMainPage/userMainPage';
import shelterListPage from './components/shelterListPage/shelterListPage';

function App() {
  return (
    <div className={styles.app}>
      <Route path="/" component={MemberContainer} exact/>
      <Route path="/user" component={UserMainPage}/>
      <Route path="/main" component={SubMain} exact/>
      {/* <Route path="/admin" component={Admin} exact/> */}
      <Route path="/profile" component={MyPage} exact/>
      <Route path="/shelter" component={shelterListPage} exact/>
      {/* <Route path="/shelter/streaming" component={Streaming} exact/> */}
      <Route path="/streaming" component={StreamingListPage} exact/>
      {/* <Route path="/pet" component={Pet} exact/> */}
      {/* <Route path="/signup/:result" component={} exact/> */}
      {/* <Route path="/password/:auth" component={PasswordContainer} exact/> */}
    </div>
  );
}

export default App;