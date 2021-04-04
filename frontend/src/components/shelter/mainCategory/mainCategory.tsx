import React, { useState } from "react";
import styles from "./mainCategory.module.css";
import commons from "../../common/common.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonMedium, ImageLarge } from "../../common/common";
import { SignInResponseType } from "../../../interface/member";
import { ShelterInfoType } from "../../../interface/shelter";
import { ProfileInfoType } from "../../../interface/consumer";

type MainCategoryProps = {
  onChangeCategory: (category: string) => void;
  member: SignInResponseType,
  shelter: ShelterInfoType,
  profile: ProfileInfoType,
};

const MainCategory = ({ onChangeCategory, member, shelter, profile }: MainCategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeCategory(e.currentTarget.value);
  };

  return (
    <div className={styles["main-category"]}>
      <div className={styles.top}>
        <ImageLarge src={profile.profileImage} alt={profile.name} />
        <div className={styles.title}>{profile.name}</div>
        <div className={styles.site}>{shelter.siteUrl}</div>
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
        <ButtonMedium
          content="1:1 채팅"
          value="chatting"
          onClick={onClick}
          buttonColor="bg-green"
        />
        { member.memberRole === "SHELTER" &&
          <ButtonMedium
            content="입양 신청"
            value="adopt"
            onClick={onClick}
            buttonColor="bg-green"
            />
        }
        { member.memberRole === "CONSUMER" &&
          <ButtonMedium
            content="후원하기 "
            value="donation"
            onClick={onClick}
            buttonColor="bg-green"
            />
        }
        <div className={`${styles["introduction-box"]}`}>
          <FontAwesomeIcon
            className={`${commons["text-color"]} ${styles["btn-edit"]}`}
            icon={faPencilAlt}
          />
          <div className={styles.introduction}>{shelter.introduce}</div>
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
