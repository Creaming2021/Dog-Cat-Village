import React, { useState } from "react";
import styles from "./mainCategory.module.css";
import commons from "../../../common/common.module.css";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type MainCategoryProps = {
  onChangeCategory: (
    category: "home" | "notice" | "board" | "animal" | "chatting" | "donation"
  ) => void;
};

const MainCategory = ({ onChangeCategory }: MainCategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    // onChangeCategory(value);
  };

  return (
    <div className={styles["main-category"]}>
      <div className={styles.top}>
        <img
          className={styles.profile}
          src="https://pds.joins.com/news/component/htmlphoto_mmdata/202003/16/fd00acc3-bba5-433e-a3a7-6ad536141cfd.jpg"
          alt="프로필 이미지"
        />
        <div className={styles.title}>동렬 아저씨의 동물농장</div>
        <div className={styles.site}>www.naver.com</div>
        <div className={styles.info}>010-1234-5678</div>
        <div className={styles.info}>dongdong@naver.com</div>
      </div>
      <div className={styles.bottom}>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="home"
        >
          홈
        </button>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="notice"
        >
          공지사항
        </button>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="board"
        >
          게시판
        </button>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="animal"
        >
          보호 동물
        </button>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="chatting"
        >
          1:1 채팅
        </button>
        <button
          className={`${commons["bg-green"]} ${commons["btn-middle"]}`}
          onClick={onClick}
          value="donation"
        >
          후원하기
        </button>
        <div className={`${styles["introduction-box"]}`}>
          <FontAwesomeIcon
            className={`${commons["text-color"]} ${styles["btn-edit"]}`}
            icon={faPencilAlt}
          />
          <div className={styles.introduction}>
            <div>안녕하세요 동아동입니다~</div>
            <div>많은 관심과 후원 감사합니다!</div>
            <div>하는 등의 소개글</div>
            <div>안녕하세요 동아동입니다~</div>
            <div>많은 관심과 후원 감사합니다!</div>
            <div>하는 등의 소개글</div>
            <div>안녕하세요 동아동입니다~</div>
            <div>많은 관심과 후원 감사합니다!</div>
            <div>하는 등의 소개글</div>
            <div>안녕하세요 동아동입니다~</div>
            <div>많은 관심과 후원 감사합니다!</div>
            <div>하는 등의 소개글</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
