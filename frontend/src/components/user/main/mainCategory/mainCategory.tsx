import React, { useState } from "react";
import styles from "./mainCategory.module.css";
import commons from "../../../common/common.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonMedium, ImageLarge } from "../../../common/common";

type MainCategoryProps = {
  onChangeCategory: (category: string) => void;
  userInfo: {
    name: string;
    imageUrl: string;
    siteUrl: string;
    phoneNumber: string;
    email: string;
    introduction: string;
    memberRole: string;
  };
};

const MainCategory = ({ onChangeCategory, userInfo }: MainCategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChangeCategory(e.currentTarget.value);
  };

  return (
    <div className={styles["main-category"]}>
      <div className={styles.top}>
        <ImageLarge src={userInfo.imageUrl} alt={userInfo.name} />
        <div className={styles.title}>{userInfo.name}</div>
        <div className={styles.site}>{userInfo.siteUrl}</div>
        <div className={styles.info}>{userInfo.phoneNumber}</div>
        <div className={styles.info}>{userInfo.email}</div>
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
        { userInfo.memberRole === "SHELTER" &&
          <ButtonMedium
            content="입양 신청"
            value="adopt"
            onClick={onClick}
            buttonColor="bg-green"
            />
        }
        { userInfo.memberRole === "CONSUMER" &&
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
          <div className={styles.introduction}>{userInfo.introduction}</div>
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
