import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import SubMain from './components/user/main/subMain/subMain';
import MemberContainer from './containers/memberContainer';
import MyPage from './components/myPage/myPage';
import StreamingListPage from './components/streamingListPage/streamingListPage';
import UserMainPage from './components/userMainPage/userMainPage';
import shelterListPage from './components/shelterListPage/shelterListPage';
import ErrorAlert, { ProtectedRouteConsumer, ProtectedRouteShelter, ProtectedRouteAdmin, ProtectedRouteToken } from './components/error/errorAlert';
import PasswordContainer from './containers/passwordContainer';
import ConfirmSignUp from './components/submain/confirmSignUp/confirmSignUp';

function App() {
  return (
    <div className={styles.app}>
      <Switch>
        {/* <ProtectedRouteConsumer path="/user" Component={UserMainPage} exact/> */}
        <ProtectedRouteConsumer path="/user" Component={MyPage} exact/>
        <ProtectedRouteShelter path="/main" Component={SubMain} exact/>
        {/* <ProtectedRouteAdmin path="/admin" Component={Admin} exact/> */}
        <Route path="/profile" component={MyPage} exact/>
        {/* <Route path="/shelter/streaming" component={Streaming} exact/> */}
        <ProtectedRouteConsumer path="/shelter" Component={shelterListPage} exact/>
        <ProtectedRouteConsumer path="/streaming" Component={StreamingListPage} exact/>
        {/* <ProtectedRouteConsumer path="/pet" Component={Pet} exact/> */}
        <Route path="/members/signup/:result" component={ConfirmSignUp} exact/>
        <Route path="/members/password/:auth" component={PasswordContainer} exact/>
        <ProtectedRouteToken path="/" Component={MemberContainer} exact/>
        <Route>
          <ErrorAlert message="잘못된 요청 입니다."/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;