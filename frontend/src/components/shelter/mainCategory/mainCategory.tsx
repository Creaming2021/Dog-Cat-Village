import React, { useState } from "react";
import styles from "./mainCategory.module.css";
import commons from "../../common/common.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonLarge, ButtonMedium, ButtonSmall, ImageLarge, ModalMedium } from "../../common/common";
import { SignInResponseType } from "../../../interface/member";
import { ModifyShelterInfoType, ShelterInfoType } from "../../../interface/shelter";
import { ProfileInfoType } from "../../../interface/consumer";

type ModifyShelterInfoProps = {
  onClose: () => void,
  onSubmit: () => void,
  onChangeInput: (e:any) => void,
  input: ModifyShelterInfoType
}

const ModifyShelterInfo = ({ input, onSubmit, onClose, onChangeInput }: ModifyShelterInfoProps) => {
  const onSubmitEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.key === "Enter") {
      onSubmit();
    }
  }
 
  return (
  <div className={styles['modify-shelter-info-container']}>
    <input
      className={styles['input-site']} 
      name="siteUrl" 
      value={input.siteUrl} 
      onChange={onChangeInput}
      onKeyDown={onSubmitEnter}
      placeholder="사이트 주소를 입력하세요."/><br/>
    <input 
      className={styles['input-introduce']}
      name="introduce" 
      value={input.introduce} 
      onChange={onChangeInput}
      onKeyDown={onSubmitEnter}
      placeholder="보호소를 소개해주세요."/><br/>
    <ButtonSmall
      buttonColor="bg-blue"
      content="수정"
      onClick={onSubmit}/>
    <ButtonSmall
      buttonColor="bg-yellow"
      content="취소"
     onClick={onClose}/>
  </div>);
}

type MainCategoryProps = {
  onChangeCategory: (category: string) => void;
  member: SignInResponseType | null,
  shelter: ShelterInfoType | null,
  profile: ProfileInfoType,
  onSubmitModify: (modifyInput: ModifyShelterInfoType) => void,
  onClickChat: () => void,
  selectedShelterId: number,
  onOpenDonation: () => void,
};

const MainCategory = ({ onOpenDonation, onChangeCategory, member, shelter, profile, onSubmitModify, onClickChat, selectedShelterId }: MainCategoryProps) => {
  const initialState = {
    siteUrl: shelter?.siteUrl || '',
    introduce: shelter?.introduce ||'',
    shelterId: member?.memberId || -1,
  };
  
  const [ modify, setModify ] = useState<boolean>(false);
  const [ modifyInput, setModifyInput ] = useState<ModifyShelterInfoType>(initialState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeCategory(e.currentTarget.value);
  };

  const onClickModify = () => {
    setModifyInput({ ...initialState })
    setModify(true);
  }

  const onCloseModify = () => {
    setModify(false);
  }

  const onModifySubmit = () => {
    onSubmitModify(modifyInput);
    onCloseModify();
  }

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;

    setModifyInput({
      ...modifyInput,
      [name]: value,
    })
  }

  return (<>
    <div className={styles["main-category"]}>
      <div className={styles.top}>
        <ImageLarge src={profile.profileImage} alt={profile.name} />
        <div className={styles.title}>{profile.name}</div>
        <div className={styles.site}>{shelter?.siteUrl}</div>
        <div className={styles.info}>{profile.phoneNumber}</div>
        <div className={styles.info}>{profile.email}</div>
      </div>
      <div className={styles.bottom}>
        <ButtonMedium
          content="홈"
          value="home"
          onClick={onClick}
          buttonColor="bg-green"
        />
        <ButtonMedium
          content="보호 동물"
          value="animal"
          onClick={onClick}
          buttonColor="bg-green"
        />
        {/* <ButtonMedium
          content="1:1 채팅"
          value="chatting"
          onClick={member?.memberRole === "SHELTER" ? onClick : onClickChat}
          buttonColor="bg-green"
        /> */}
        {/* { member?.memberRole === "SHELTER" &&
          <ButtonMedium
            content="입양 신청"
            value="adopt"
            onClick={onClick}
            buttonColor="bg-green"
            />
        }*/}
        { member?.memberRole === "CONSUMER" &&
          <ButtonMedium
            content="후원하기 "
            value="donation"
            onClick={onOpenDonation}
            buttonColor="bg-green"
            />
        }
        <div className={`${styles["introduction-box"]}`}>
          { member?.memberId === selectedShelterId &&
              <FontAwesomeIcon
              className={`${commons["text-color"]} ${styles["btn-edit"]}`}
              icon={faPencilAlt}
              onClick={onClickModify}
            />
          }
          <div className={styles.introduction}>{shelter?.introduce}</div>
        </div>
      </div>
    </div>
    { modify && 
      <ModalMedium>
        <ModifyShelterInfo
          input={modifyInput}
          onSubmit={onModifySubmit}
          onClose={onCloseModify}
          onChangeInput={onChangeInput}/>
      </ModalMedium>}
  </>);
};

export default MainCategory;
