import { AdoptChangeStatusType, AdoptDetailType, AdoptListType, AdoptRegisterRequestType, GetAdoptDetailRequestType } from '../interface/adopt';
import { security } from './instance';

// 개인 유저의 입양 신청 목록 조회
export const getConsumerAdoptList = async ( id: number ) => {
  const response = await security.get<AdoptListType[]>(`consumers/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
	return response.data;
}

// 입양 신청 등록
export const registerAdopt = async ({ id, adoptRegisterForm }: AdoptRegisterRequestType ) => {
  const response = await security.post<undefined>(`consumers/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
    adoptRegisterForm,
	});
	return response.data;
}

// 개인 유저의 입양 신청 디테일 정보 조회
export const getConsumerAdoptDetail = async ({ id, adoptId }: GetAdoptDetailRequestType) => {
  const response = await security.get<AdoptDetailType>(`consumers/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
	return response.data;
}

// 보호소 유저의 입양 신청 목록 조회
export const getShleterAdoptList = async ( id: number ) => {
  const response = await security.get<AdoptListType[]>(`shelters/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
	return response.data;
}

// 보호소 유저의 입양 신청 디테일 정보 조회
export const getShelterAdoptDetail = async ({ id, adoptId }: GetAdoptDetailRequestType) => {
  const response = await security.get<AdoptDetailType>(`shelters/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
	return response.data;
}

// 입양 신청 상태 변경 요청
export const changeAdoptStatus = async ({ id, adoptId, status }: AdoptChangeStatusType) => {
  const response = await security.put<AdoptDetailType>(`shelters/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
    status
	});
	return response.data;
};

