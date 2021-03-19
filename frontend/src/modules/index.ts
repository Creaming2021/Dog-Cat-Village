import { combineReducers } from 'redux';
import user from './user';

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({ 
    user,
})
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;