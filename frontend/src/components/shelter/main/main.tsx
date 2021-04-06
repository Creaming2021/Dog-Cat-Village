import React, { useState } from "react";
import PetListContainer from "../../../containers/petListContainer";
import { useSelector } from "react-redux";
import AdoptContainer from "../../../containers/adoptContainer";
import ShelterContainer from "../../../containers/shelterContainer";
import { RootState } from "../../../modules";
import Nav from "../../nav/nav";
import Donation from "../donation/donation";
import Home from "../home/home";
import styles from "./main.module.css";
import ChattingContainer from "../../../containers/chattingContainer";

const Main = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
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
      <Nav role={member.data?.memberRole || ""} />
      <div className={styles["sub-main-box"]}>
        <ShelterContainer onChangeCategory={onChangeCategory}/>
        {category === "home" && <Home type="shelter" streaming={streaming} />}
        {category === "animal" && <PetListContainer/>}
        {category === "chatting" && 
          <div className={styles['chatting-container']}><ChattingContainer /></div>}
        {category === "donation" && <Donation />}
        {category === "adopt" && <AdoptContainer/>}
      </div>
    </div>
  );
};

export default Main;
