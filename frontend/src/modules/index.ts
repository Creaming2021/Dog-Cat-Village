import { combineReducers } from "redux";
import member, { memberSaga } from './member';
import blockchain, { blockchainSaga } from './blockchain';
import pet, { petSaga } from './pet';
import adopt, { adoptSaga } from './adopt';
import { all } from 'redux-saga/effects';
import { consumer } from './consumer';
import { shelter } from './shelter';

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({
  member,
  pet,
  blockchain,
  adopt,
  consumer,
  shelter,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가를 만들어서 내보내주세요.
export function* rootSaga() {
  yield all([memberSaga(), petSaga(), blockchainSaga(), adoptSaga()]);
}