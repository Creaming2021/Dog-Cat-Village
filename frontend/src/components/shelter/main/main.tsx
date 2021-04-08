import React, { useEffect, useState } from "react";
import PetListContainer from "../../../containers/petListContainer";
import { useSelector } from "react-redux";
import AdoptContainer from "../../../containers/adoptContainer";
import ShelterContainer from "../../../containers/shelterContainer";
import { RootState } from "../../../modules";
import Nav from "../../nav/nav";
import Home from "../home/home";
import styles from "./main.module.css";
import ChattingContainer from "../../../containers/chattingContainer";
import { ModalMedium } from "../../common/common";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DonationContainer from "../../../containers/donationContainer";

export type MainProps = {
  match : any;
}

const Main = ({ match }: MainProps ) => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const shelter = useSelector((state: RootState) => state.member.shelterInfo)
  const [ category, setCategory ] = useState<string>("home");
  const [ chatting, setChatting ] = useState(false);
  const [ selectedShelterId, setSelectedShelterId ] = useState<number>(-1);
  const [ donation, setDonation ] = useState(false);

  useEffect(() => {
    setSelectedShelterId(+match.params.id);
  }, []);

  const onClickChat = () => {
    setChatting(!chatting);
  }

  const onChangeCategory = (category: string): void => {
    setCategory(category);
  };
  
  const onOpenDonation = () => {
    setDonation(true);
  }
  
  const onCloseDonation = () => {
    setDonation(false);
  }

  return (
    <div className={styles["sub-main-container"]}>
      <Nav role={member.data?.memberRole || ""} memberId={member.data?.memberId || -1} />
      <div className={styles["sub-main-box"]}>
        <ShelterContainer 
          onChangeCategory={onChangeCategory} 
          onClickChat={onClickChat}
          selectedShelterId={selectedShelterId}
          onOpenDonation={onOpenDonation}/>

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

        {donation &&
          <ModalMedium>
            <DonationContainer 
              onClose={onCloseDonation}
              shelterId={+match.params.id}/>
          </ModalMedium>
        }

        { /*{category === "adopt" && <AdoptContainer/>} */}
      </div>
    </div>
  );
};

export default Main;
