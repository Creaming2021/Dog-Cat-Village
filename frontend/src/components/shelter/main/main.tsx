import React, { useEffect, useState } from "react";
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

export type MainProps = {
  match : any;
}

const Main = ({ match }: MainProps ) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const shelter = useSelector((state: RootState) => state.member.shelterInfo)
  const [ category, setCategory ] = useState<string>("home");
  const [ chatting, setChatting ] = useState(false);
  const [ selectedShelterId, setSelectedShelterId ] = useState<number>(-1);

  useEffect(() => {
    setSelectedShelterId(+match.params.id);
  }, []);

  const onClickChat = () => {
    setChatting(!chatting);
  }

  const onChangeCategory = (category: string): void => {
    setCategory(category);
  };

  return (
    <div className={styles["sub-main-container"]}>
      <Nav role={member.data?.memberRole || ""} memberId={member.data?.memberId || -1} />
      <div className={styles["sub-main-box"]}>
        <ShelterContainer 
          onChangeCategory={onChangeCategory} 
          onClickChat={onClickChat}
          selectedShelterId={selectedShelterId}/>

        {category === "home" && 
          <Home type={member.data?.memberRole || ''} 
            shelterId={selectedShelterId}
            memberId={member.data?.memberId}/>}

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
            <ChattingContainer listSet={false} selectedShelterId={selectedShelterId}/>
          </ModalMedium>}  

        {/* {category === "donation" && <Donation />}

        {category === "adopt" && <AdoptContainer/>} */}
      </div>
    </div>
  );
};

export default Main;
