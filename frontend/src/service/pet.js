import client from './client';

// 반려동물 전체 조회
export const getPetList = () => {
	return client.get('pets');
}

// 반려동물 등록
export const registerPet = ( petInfo ) => {
	return client.post('pets', petInfo );
}

// 반려동물 정보 조회
export const getPet = ( id ) => {
	return client.get(`pets/${id}`);
}

// 반려동물 정보 수정
export const modifyPet = ( petInfo ) => {
	return client.put(`pets/${petInfo.id}`, petInfo);
}

// 반려동물 삭제
export const deletePet = ( id ) => {
	return client.delete(`pets/${id}`);
}

// 반려동물 이미지 삽입
