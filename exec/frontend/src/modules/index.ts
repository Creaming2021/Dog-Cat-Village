import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import member, { memberSaga } from './member';
import chat, { chatSaga } from './chat';
import blockchain, { blockchainSaga } from './blockchain';
import pet, { petSaga } from './pet';
import adopt, { adoptSaga } from './adopt';
import { all } from 'redux-saga/effects';
import { consumer } from './consumer';
import { shelter } from './shelter';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['member'],
}

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({
  member,
  chat,
  pet,
  blockchain,
  adopt,
  consumer,
  shelter,
});

export type RootState = ReturnType<typeof rootReducer>;

// 루트 사가를 만들어서 내보내주세요.
export function* rootSaga() {
  yield all([memberSaga(), chatSaga(), petSaga(), blockchainSaga(), adoptSaga()]);
}

export default persistReducer(persistConfig, rootReducer);