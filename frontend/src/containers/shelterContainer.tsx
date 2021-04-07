import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCategory from "../components/shelter/mainCategory/mainCategory";
import { ModifyShelterInfoType } from "../interface/shelter";
import { RootState } from "../modules";
import * as MemberActions from "../modules/member";
import { getShelterInfo } from "../modules/shelter";

type ShelterContainerProps = {
  onChangeCategory: (category: string) => void,
  onClickChat: () => void,
}

const ShelterContainer = ({ onChangeCategory, onClickChat }: ShelterContainerProps) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const shelter = useSelector((state: RootState) => state.member.shelterInfo);
  const profile = useSelector((state: RootState) => state.shelter);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(member, shelter, profile);
    getMemberInfo();
    if(member.data) dispatch(getShelterInfo(member.data?.memberId));
  }, [member]);

  // 보호소 메인 정보 및 유저 정보 조회
  const getMemberInfo = () => {
    if (member.data) {
      dispatch(MemberActions.getShelterInfoAsync.request(member.data.memberId));
    }
  };

  // 보호소 메인 정보 수정
  const ModifyShelterInfo = (modifyInput: ModifyShelterInfoType) => {
    dispatch(MemberActions.modifyShelterInfoAsync.request(modifyInput));
  };

  return (
    <>
    {/* { member.data !== null && shelter.data !== null && !profile && (
      <MainCategory 
        member={member.data} 
        shelter={shelter.data} 
        profile={
          profile.data || {
            profileImage: "https://static.remove.bg/remove-bg-web/71dbdf11b48cb655eefe2f609ad67295258ae141/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
            name: "이름",
            phoneNumber: "번호",
            email: "메일",
          }
        }
        onChangeCategory={onChangeCategory} 
        onSubmitModify={ModifyShelterInfo}
        onClickChat={onClickChat}/>
      )
    } */}

    {member.data !== null && shelter.data !== null && !profile && (
      <MainCategory
        member={member.data}
        shelter={shelter.data}
        profile={profile}
        onChangeCategory={onChangeCategory} 
        onSubmitModify={ModifyShelterInfo}
        onClickChat={onClickChat}/>
    )}
    </>
  );
};

export default ShelterContainer;
