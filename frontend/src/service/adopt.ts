import { AdoptChangeStatusType, AdoptDetailType, AdoptListType, AdoptRegisterRequestType, GetAdoptDetailRequestType } from '../interface/adopt';
import { security } from './instance';

// 개인 유저의 입양 신청 목록 조회
export const getConsumerAdoptList = ( id: number ) => {
  return security.get<AdoptListType[]>(`api/consumers/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 입양 신청 등록
export const registerAdopt = ( { id, adoptRegisterForm }: AdoptRegisterRequestType ) => {
  return security.post<undefined>(`api/consumers/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
    adoptRegisterForm,
	});
}

// 개인 유저의 입양 신청 디테일 정보 조회
export const getConsumerAdoptDetail = ({ id, adoptId }: GetAdoptDetailRequestType) => {
  return security.get<AdoptDetailType>(`api/consumers/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 보호소 유저의 입양 신청 목록 조회
export const getShleterAdoptList = ( id: number ) => {
  return security.get<AdoptListType[]>(`api/shelter/${id}/adopts`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 보호소 유저의 입양 신청 디테일 정보 조회
export const getShelterAdoptDetail = ({ id, adoptId }: GetAdoptDetailRequestType) => {
  return security.get<AdoptDetailType>(`api/shelter/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 입양 신청 상태 변경 요청
export const changeAdoptStatus = ({ id, adoptId, status }: AdoptChangeStatusType) => {
  return security.put<AdoptDetailType>(`api/shelter/${id}/adopts/${adoptId}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
    status
	});
};

