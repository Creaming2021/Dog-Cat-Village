import { AxiosError } from "axios"; 
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions"; 
import * as TestAPI from "../service/test";
import { asyncState, createAsyncReducer, transformToArray } from "../lib/reducerUtils";
import { takeEvery } from 'redux-saga/effects';
import createAsyncSaga from "../lib/createAsyncSaga";

const GET_USER_PROFILE = "test/GITHUB_USER_PROFILE";
const GET_USER_PROFILE_SUCCESS = "test/GITHUB_USER_PROFILE_SUCCESS";
const GET_USER_PROFILE_ERROR = "test/GITHUB_USER_PROFILE_FAILURE";
  
export const getUserProfileAsync = createAsyncAction( 
  GET_USER_PROFILE, 
  GET_USER_PROFILE_SUCCESS, 
  GET_USER_PROFILE_ERROR 
)<TestAPI.test, TestAPI.GithubProfile, AxiosError>(); 
// )<any, TestAPI.GithubProfile, AxiosError>(); 

// export const getUserProfile = createStandardAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(GET_USER_PROFILE_SUCCESS)<TestAPI.GithubProfile>();
// export const getUserProfileError = createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>();

// export const getUserProfileAsync = ({ ...arg}: any) => { request: getUserProfile, success: getUserProfileSuccess, failure: getUserProfileError};

// export const getUserProfileThunk = createAsyncThunk(getUserProfileAsync, TestAPI.getUserProfile);

// export const getUserProfileThunk = 
//  (username: string): ThunkAction<void, RootState, null, GithubAction> => async (dispatch: Dispatch) => { 

//   console.log(getUserProfileAsync);
//    const {request, success, failure} = getUserProfileAsync; 

//    dispatch(request()); 

//    try { 
//      const userProfile = await TestAPI.getUserProfile(username) 
//      dispatch(success(userProfile)); 
//     } catch (error) { 
//       dispatch(failure(error)); 
//    } 
// } 

const getUserProfileSaga = createAsyncSaga(getUserProfileAsync, TestAPI.getUserProfile);

// function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
//   try {
//     const userProfile: TestAPI.GithubProfile = yield call(TestAPI.getUserProfile, action.payload);
//     yield put(getUserProfileAsync.success(userProfile));
//   } catch (e) {
//     yield put(getUserProfileAsync.failure(e));
//   }
// }

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}

const actions = { getUserProfileAsync };

type GithubAction = ActionType<typeof actions> 

type GithubState = { 
  userProfile: { 
    loading: boolean; 
    data: TestAPI.GithubProfile | null; 
    error: Error | null; 
  } 
} 

// const initialState = { 
//   userProfile: { 
//     loading: false, 
//     data: null, 
//     error: null, 
//   }, 
// } 

const initialState: GithubState = {
  userProfile: asyncState.initial(),
};

// const test = createReducer<GithubState, GithubAction>(initialState, 
//   { 
//     [GET_USER_PROFILE]: state => ({ 
//       ...state, 
//       userProfile: { 
//         loading: true, 
//         data: null, 
//         error: null, 
//       }, 
//     }), 
//     [GET_USER_PROFILE_SUCCESS]: (state, action) => ({ 
//       ...state, 
//       userProfile: { 
//         loading: false, 
//         data: action.payload, 
//         error: null, 
//       }, 
//     }), 
//     [GET_USER_PROFILE_ERROR]: (state, action) => ({ 
//       ...state, 
//       userProfile: { 
//         loading: false, 
//         data: null, 
//         error: action.payload, 
//       }, 
//     }), 
//   } 
// ) 

const test = createReducer<GithubState, GithubAction>(initialState).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, 'userProfile')
);

export default test;

