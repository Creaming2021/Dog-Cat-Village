import { PetDetailType, PetEditType, PetListType, PetProfileImage } from '../interface/pet';
import { image, security } from './instance';

// 반려동물 전체 조회
export const getPetList = () => {
	return security.get<PetListType[]>('pets', {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 반려동물 등록
export const registerPet = ( petInfo: PetEditType ) => {
	return security.post<undefined>('pets', {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
		petInfo,
});
}

// 반려동물 정보 조회
export const getPet = ( id: number ) => {
	return security.get<PetDetailType>(`pets/${id}`, {
		  'headers': {
		    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		  }
	});
}

// 반려동물 정보 수정
export const modifyPet = ( petInfo: PetEditType ) => {
	return security.put<PetDetailType>(`pets/${petInfo.id}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		},
		petInfo,
	});
}

// 반려동물 삭제
export const deletePet = ( id: number ) => {
	return security.delete<undefined>(`pets/${id}`, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}

// 반려동물 이미지 삽입
export const setProfileImage = ( profileImage: PetProfileImage) => {
	return image.post<undefined>('pets/${petId}/image', profileImage, {
		'headers': {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
		}
	});
}
