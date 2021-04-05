import React, { useState } from "react";
import AdoptContainer from "../../../../containers/adoptContainer";
import WalletContainer from "../../../../containers/walletContainer";
import Nav from "../../../nav/nav";
import Animal from "../animal/animal";
import Chatting from "../chatting/chatting";
import Donation from "../donation/donation";
import Home from "../home/home";
import MainCategory from "../mainCategory/mainCategory";
import styles from "./subMain.module.css";

const SubMain = () => {
  const [category, setCategory] = useState<string>("home");

  const member = {memberRole: 'SHELTER'};

  const onChangeCategory = (category: string): void => {
    setCategory(category);
  };

  const userInfo = {
    name: "동렬 아저씨의 동물 농장",
    imageUrl:
      "https://img2.sbs.co.kr/img/sbs_cms/WE/2020/07/10/WE61973057_ori.jpg",
    siteUrl: "www.naver.com",
    phoneNumber: "01012345678",
    email: "ssafy@ssafy.com",
    introduction:
      "안녕하세요 동아동입니다~ 많은 관심과 후원 감사합니다! 하는 등의 소개글",
    memberRole: "SHELTER",
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
        <MainCategory userInfo={userInfo} onChangeCategory={onChangeCategory} />
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
