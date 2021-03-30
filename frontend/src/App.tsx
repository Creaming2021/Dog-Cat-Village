import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import SubMain from './components/user/main/subMain/subMain';
import MemberContainer from './containers/memberContainer';
import MyPage from './components/myPage/myPage';
import StreamingListPage from './components/streamingListPage/streamingListPage';
import UserMainPage from './components/userMainPage/userMainPage';
import shelterListPage from './components/shelterListPage/shelterListPage';
import RouteNoMatch, { ProtectedRouteConsumer, ProtectedRouteShelter, ProtectedRouteAdmin, ProtectedRouteToken } from './components/error/routeNoMatch';

function App() {
  return (
    <div className={styles.app}>
      <Switch>
        <ProtectedRouteConsumer path="/user" Component={UserMainPage} exact/>
        <ProtectedRouteShelter path="/main" Component={SubMain} exact/>
        {/* <ProtectedRouteAdmin path="/admin" Component={Admin} exact/> */}
        <Route path="/profile" component={MyPage} exact/>
        {/* <Route path="/shelter/streaming" component={Streaming} exact/> */}
        <ProtectedRouteConsumer path="/shelter" Component={shelterListPage} exact/>
        <ProtectedRouteConsumer path="/streaming" Component={StreamingListPage} exact/>
        {/* <ProtectedRouteConsumer path="/pet" Component={Pet} exact/> */}
        {/* <Route path="/signup/:result" component={} exact/> */}
        {/* <Route path="/password/:auth" component={PasswordContainer} exact/> */}
        <ProtectedRouteToken path="/" Component={MemberContainer} exact/>
        <Route component={RouteNoMatch} />
      </Switch>
    </div>
  );
}

export default App;