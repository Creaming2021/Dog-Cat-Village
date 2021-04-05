import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import test, { githubSaga } from './test';
import member, { memberSaga } from './member';
import adopt, { adoptSaga } from './adopt';

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({
  member,
  test,
  adopt,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가를 만들어서 내보내주세요.
export function* rootSaga() {
  yield all([memberSaga(), githubSaga(), adoptSaga()]);
}