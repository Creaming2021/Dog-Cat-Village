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
import { ModalMedium } from "../../common/common";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Main = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const [ category, setCategory ] = useState<string>("home");
  const [ chatting, setChatting ] = useState(false);

  const onClickChat = () => {
    setChatting(!chatting);
  }

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
      <Nav role={member.data?.memberRole || ""} memberId={member.data?.memberId || -1} />
      <div className={styles["sub-main-box"]}>
        <ShelterContainer onChangeCategory={onChangeCategory} onClickChat={onClickChat}/>

        {category === "home" && 
          <Home type={member.data?.memberRole || ''} streaming={streaming} />}

        {category === "animal" && 
          <PetListContainer/>}

        {category === "chatting" && member.data?.memberRole === "SHELTER" &&
          <div className={styles['chatting-container']}>
            <ChattingContainer listSet={true}/></div>}

        {chatting && member.data?.memberRole === "CONSUMER" &&
          <ModalMedium>
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              className={styles['chat-close-icon']}
              onClick={onClickChat}/>
            <ChattingContainer listSet={false}/>
          </ModalMedium>}  

        {category === "donation" && <Donation />}

        {category === "adopt" && <AdoptContainer/>}
      </div>
    </div>
  );
};

export default Main;
