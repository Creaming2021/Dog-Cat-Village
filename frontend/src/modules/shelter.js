import { basic, image } from '../service/instance';


const GET_SHELTER_INFO = "consumer/GET_SHELTER_INFO";
const PUT_SHELTER_INFO = "consumer/PUT_SHELTER_INFO";
const POST_SHELTER_PROFILE_IMG = "consumer/POST_SHELTER_PROFILE_IMG";


export const getShelterInfo = (id) => async dispatch => {
  const response = await basic.get(`/shelters/${id}/profile`);
  dispatch({
    type: GET_SHELTER_INFO,
    payload: response.data,
  });
};

export const putShelterInfo = (data) => async dispatch => {
  const response = await basic.put(`/shelters/${data.id}/profile`, data);
  dispatch({
    type: PUT_SHELTER_INFO,
    payload: response.data,
  });
};

export const postShelterProfileImg = (data) => async dispatch => {
  console.log(data);
  const response = await image.post(`/shelters/${data.id}/image`, data.formData);
  console.log(response);
  dispatch ({
    type: POST_SHELTER_PROFILE_IMG,
  });
};

const initialState = {
  contractAddress: "",
  email: "",
  introduce: "",
  monthlyAdoption: [],
  name: "",
  phoneNumber: "",
  profileImage: ""
}

export const shelter = (state=initialState, action) => {
  switch(action.type) {
    case GET_SHELTER_INFO:
      return {
        ...state,
        ...action.payload
      };
    
    case PUT_SHELTER_INFO:
      return {
        ...state,
        ...action.payload
      };
    
    case POST_SHELTER_PROFILE_IMG:
      return state;

    default:
      return state;
  };
};
