import { ModifyShelterInfoType, ShelterInfoType } from '../interface/shelter';
import { security } from './instance';

// 보호소 메인 정보 조회
export const getShelterInfo = ( shelterId: number) => {
  return security.get<ShelterInfoType>(`shelters/${shelterId}/main`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });
}

// 보호소 메인 정보 수정
export const modifyShelterInfo = ({ shelterId, introduce, siteUrl }: ModifyShelterInfoType) => {
	return security.put<ShelterInfoType>(`shelters/${shelterId}/main`, 
    { introduce, siteUrl },
    {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    }
  );
}
