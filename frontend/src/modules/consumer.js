// 해당 유저 정보 가져오기
import { basic, image, security } from '../service/instance';


const GET_CONSUMER_INFO = "consumer/GET_CONSUMER_INFO";
const PUT_CONSUMER_INFO = "consumer/PUT_CONSUMER_INFO";
const POST_CONSUMER_PROFILE_IMG = "consumer/POST_CONSUMER_PROFILE_IMG";

export const getUserInfo = (id) => async dispatch => {
  const response = await security.get(`/consumers/${id}`);
  dispatch({
    type: GET_CONSUMER_INFO,
    payload: response.data,
  });
};

export const putUserInfo = (data) => async dispatch => {
  const response = await basic.put(`/consumers/${data.id}`, data);
  dispatch({
    type: PUT_CONSUMER_INFO,
    payload: response.data,
  });
};

export const postUserProfileImg = (data) => async dispatch => {
  console.log(data);
  const response = await image.post(`/consumers/${data.id}/image`, data.formData);
  console.log(response);
  dispatch ({
    type: POST_CONSUMER_PROFILE_IMG,
  });
};


const initialState = {
  contractAddress: "",
  email: "",
  id: 0,
  name: "",
  phoneNumber: "",
  profileImage: ""
}

export const consumer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CONSUMER_INFO:
      return {
        ...state,
        ...action.payload
      };
    
    case PUT_CONSUMER_INFO:
      return {
        ...state,
        ...action.payload
      };
    
    case POST_CONSUMER_PROFILE_IMG:
      return state;

    default:
      return state;
  };
};
