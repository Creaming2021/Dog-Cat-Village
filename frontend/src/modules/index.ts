import { combineReducers } from "redux";
import member from "./member";

// 여러 리듀서를 합쳐서 rootReducer에 선언
const rootReducer = combineReducers({
  member,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
