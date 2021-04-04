import React, { useState } from "react";
import AdoptContainer from "../../../containers/adoptContainer";
import { ProfileInfoType } from "../../../interface/consumer";
import { SignInResponseType } from '../../../interface/member';
import { ModifyShelterInfoType, ShelterInfoType } from "../../../interface/shelter";
import Nav from "../../nav/nav";
import Animal from "../animal/animal";
import Chatting from "../chatting/chatting";
import Donation from "../donation/donation";
import Home from "../home/home";
import MainCategory from "../mainCategory/mainCategory";
import styles from "./subMain.module.css";

type SubMainProps = {
  member: SignInResponseType,
  shelter: ShelterInfoType,
  profile: ProfileInfoType,
  onSubmitModify: (modifyInput: ModifyShelterInfoType) => void,
}

const SubMain = ({ member, shelter, profile, onSubmitModify }: SubMainProps) => {
  const [category, setCategory] = useState<string>("home");

  const onChangeCategory = (category: string): void => {
    setCategory(category);
  };

  const streaming = {
    onAir: true,
    title: "3월 24일 방송입니다.",
    video: "",
    content: "날이 참 좋네요~ 여러분 많이 보러오세요!",
    viewers: 1234,
    totalCoin: 10354,
  };

  return (
    <div className={styles["sub-main-container"]}>
      <Nav role={member.memberRole} />
      <div className={styles["sub-main-box"]}>
        <MainCategory 
          member={member} 
          shelter={shelter} 
          profile={profile}
          onChangeCategory={onChangeCategory} 
          onSubmitModify={onSubmitModify}/>
        {category === "home" && <Home type="shelter" streaming={streaming} />}
        {category === "animal" && <Animal type="center" />}
        {category === "chatting" && <Chatting />}
        {category === "donation" && <Donation />}
        {category === "adopt" && <AdoptContainer/>}
      </div>
    </div>
  );
};

export default SubMain;
