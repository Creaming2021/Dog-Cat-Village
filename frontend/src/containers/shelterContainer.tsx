import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCategory from "../components/shelter/mainCategory/mainCategory";
import { ModifyShelterInfoType } from "../interface/shelter";
import { RootState } from "../modules";
import * as MemberActions from "../modules/member";
import { getShelterInfo } from "../modules/shelter";
import { getUserInfo } from "../modules/consumer";

type ShelterContainerProps = {
  onChangeCategory: (category: string) => void,
  onClickChat: () => void,
  selectedShelterId: number,
  onOpenDonation: () => void,
}

const ShelterContainer = ({ onChangeCategory, onClickChat, selectedShelterId, onOpenDonation }: ShelterContainerProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const shelter = useSelector((state: RootState) => state.member.shelterInfo);
  const profile = useSelector((state: RootState) => state.shelter);
  const dispatch = useDispatch();

  useEffect(() => {
    if(selectedShelterId > 0) {
      getMemberInfo();
      dispatch(getShelterInfo(selectedShelterId));
    }
  }, [member, selectedShelterId]);

  // 보호소 메인 정보 및 유저 정보 조회
  const getMemberInfo = () => {
    if (member.data) {
      dispatch(MemberActions.getShelterInfoAsync.request(selectedShelterId));
    }
  };

  // 보호소 메인 정보 수정
  const ModifyShelterInfo = (modifyInput: ModifyShelterInfoType) => {
    dispatch(MemberActions.modifyShelterInfoAsync.request(modifyInput));
  };

  return (
    <>
      <MainCategory
        member={member.data}
        shelter={shelter.data}
        profile={profile}
        selectedShelterId={selectedShelterId}
        onChangeCategory={onChangeCategory} 
        onSubmitModify={ModifyShelterInfo}
        onClickChat={onClickChat}
        onOpenDonation={onOpenDonation}/>
    </>
  );
};

export default ShelterContainer;
