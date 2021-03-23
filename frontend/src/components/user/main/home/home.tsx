import React, { useState } from "react";
import styles from "./home.module.css";
import commons from "../../../common/common.module.css";
import {
  faBroadcastTower,
  faUsers,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stringify } from "node:querystring";

type OnAirStreamingProps = {};

const OnAirStreaming = ({}: OnAirStreamingProps) => {
  return (
    <div className={styles.streaming}>
      <div className={styles["title-box"]}>
        <FontAwesomeIcon
          className={`${styles["icon-broadcast"]}`}
          icon={faBroadcastTower}
        />
        <div>스트리밍 오늘의 제목!</div>
      </div>
      <div className={styles["video-box"]}>
        <video className={styles.video} src=""></video>
        <div className={styles["video-icon-box"]}>
          <FontAwesomeIcon className={styles["video-content"]} icon={faUsers} />
          <span className={styles["video-content"]}>101명 시청중</span>
          <FontAwesomeIcon className={styles["video-content"]} icon={faCoins} />
          <span className={styles["video-content"]}>10234</span>
        </div>
      </div>
      <div className={styles.content}>
        스트리밍 오늘의 내용
        <br />
        오늘은 날이 좋네요!
      </div>
    </div>
  );
};

type ReadyStreamingProps = {};

const ReadyStreaming = ({}: ReadyStreamingProps) => {
  return (
    <div className={styles.streaming}>
      <input
        className={commons["input-title"]}
        placeholder="오늘의 스트리밍 제목을 입력하세요."
      />
      <textarea
        className={commons["input-content"]}
        placeholder="오늘의 스트리밍 내용을 입력하세요."
      />
      <button className={`${commons["bg-green"]} ${commons["btn-middle"]}`}>
        스트리밍 시작하기
      </button>
    </div>
  );
};

type DonationProps = {
  userList: DonationCardProps[];
};

const Donation = ({ userList }: DonationProps) => {
  return (
    <div className={styles.donation}>
      <div className={styles["donation-info"]}>
        <div className={styles["donation-box"]}>
          <div>후원 누적 금액</div>
          <FontAwesomeIcon className={styles["icon-donation"]} icon={faCoins} />
          <span>123456</span>
        </div>
        <div className={styles["donation-box"]}>
          <div>후원 사람 수</div>
          <FontAwesomeIcon className={styles["icon-donation"]} icon={faUsers} />
          <span>145</span>
        </div>
      </div>
      <div className={styles.list}>
        {userList.map((user: DonationCardProps) => (
          <DonationCard
            key={user.id}
            id={user.id}
            nickname={user.nickname}
            imageUrl={user.imageUrl}
            total={user.total}
          />
        ))}
      </div>
    </div>
  );
};

type DonationCardProps = {
  id: number;
  nickname: string;
  imageUrl: string;
  total: number;
};

const DonationCard = ({ id, nickname, imageUrl, total }: DonationCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <img className={styles.image} src={imageUrl} alt={nickname} />
        <FontAwesomeIcon className={styles["card-text"]} icon={faCoins} />
        <span className={styles["card-text"]}>{total}</span>

        <div className={styles["card-hover"]}>
          <div className={styles["card-text"]}>{nickname}</div>
        </div>
      </div>
    </>
  );
};

type HomeProps = {
  type: string;
};

const Home = ({ type }: HomeProps) => {
  const userList: DonationCardProps[] = [
    { id: 1, nickname: "첫번째", imageUrl: "", total: 1234 },
    { id: 2, nickname: "두번째", imageUrl: "", total: 1 },
    { id: 3, nickname: "세번째", imageUrl: "", total: 12 },
    { id: 4, nickname: "네번째", imageUrl: "", total: 123 },
    { id: 5, nickname: "다섯번째", imageUrl: "", total: 12345 },
    { id: 6, nickname: "여섯번째", imageUrl: "", total: 123456 },
    { id: 7, nickname: "일곱번째", imageUrl: "", total: 1234567 },
  ];

  return (
    <>
      {type === "user" ? <OnAirStreaming /> : <ReadyStreaming />}
      <Donation userList={userList} />
    </>
  );
};

export default Home;
