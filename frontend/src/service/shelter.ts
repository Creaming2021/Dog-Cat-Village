import { ModifyShelterInfoType, ShelterInfoType } from '../interface/shelter';
import { security } from './instance';

// 보호소 메인 정보 조회
export const getShelterInfo = async ( shelterId: number) => {
  const response = await security.get<ShelterInfoType>(`shelters/${shelterId}/main`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
  return response.data;
}

// 보호소 메인 정보 수정
export const modifyShelterInfo = async ({ shelterId, introduce, siteUrl }: ModifyShelterInfoType) => {
	const response = await security.put<ShelterInfoType>(`shelters/${shelterId}/main`, 
    { introduce, siteUrl },
    {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    }
  );
  return response.data;
}
