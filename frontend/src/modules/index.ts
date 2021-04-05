import { combineReducers } from "redux";
import member, { memberSaga } from './member';
import chat, { chatSaga } from './chat';
import test, { githubSaga } from './test';
import { all } from 'redux-saga/effects';

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({
  member,
  chat,
  test
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가를 만들어서 내보내주세요.
export function* rootSaga() {
  yield all([memberSaga(), githubSaga(), chatSaga()]);
}