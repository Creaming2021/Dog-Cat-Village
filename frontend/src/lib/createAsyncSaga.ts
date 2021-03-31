import { call, put } from "redux-saga/effects";
import { AsyncActionCreatorBuilder, PayloadAction } from "typesafe-actions";
import { handleAuthResponse, handleError, handleResponse, handleSecurityError } from "../service/instance";

/* 
  유틸함수의 재사용성을 높이기 위하여 함수의 파라미터는 언제나 하나의 값을 사용하도록 하고,
  action.payload 를 그대로 파라미터로 넣어주도록 설정합니다.
  만약에 여러가지 종류의 값을 파라미터로 넣어야 한다면 객체 형태로 만들어줘야 합니다.
*/
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// action 이 payload 를 갖고 있는지 확인합니다.
// __ is __ 문법은 Type guard 라고 부릅니다 https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
function isPayloadAction<P>(action: any): action is PayloadAction<any, P> {
  return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    // [액션타입 , 페이로드타입] or [액션타입 [페이로드타입,메타타입]]
    [T1, [P1, undefined]],
    [T2, [P2, undefined]],
    [T3, [P3, undefined]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<any>) {
    try {
      const result: P2 = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);

      // 요청 성공시 핸들러에 보내기
      if(action.type === "member/SIGN_IN"){
        handleAuthResponse(result);
      } else{
        handleResponse(result);
      }
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      const exception: string[] = ['member/SIGN_UP', 'member/SIGN_IN',
                                  'member/FIND_PW', 'member/SET_PW'];
      // 요청 실패시 핸들러에 보내기
      if(exception.indexOf(action.type) >= 0){
        handleError(e);
      }else {
        handleSecurityError(e);
        // 리프레쉬 토큰으로 다시 요청 던지는 액션 부르기
        console.log("리프레쉬 토큰 요청");
      }
      yield put(asyncActionCreator.failure(e));
    }
  };
}