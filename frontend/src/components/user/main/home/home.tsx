import React, { useState } from "react";
import styles from "./home.module.css";
import commons from "../../../common/common.module.css";
import {
  faBroadcastTower,
  faUsers,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonLarge, ImageSmall } from "../../../common/common";

type OnAirStreamingProps = {
  onAir: boolean;
  title: string;
  video?: string;
  content?: string;
  viewers?: number;
  totalCoin?: number;
};

const OnAirStreaming = ({
  onAir,
  title,
  video,
  content,
  viewers,
  totalCoin,
}: OnAirStreamingProps) => {
  return (
    <div className={styles.streaming}>
      <div className={styles["title-box"]}>
        <FontAwesomeIcon
          className={
            onAir
              ? `${styles["icon-broadcast"]} ${styles["on-air"]}`
              : `${styles["icon-broadcast"]}`
          }
          icon={faBroadcastTower}
        />
        <div>{title}</div>
      </div>
      <div className={styles["video-box"]}>
        <video className={styles.video} src={video} />
        {onAir && (
          <div className={styles["video-icon-box"]}>
            <FontAwesomeIcon
              className={styles["video-content"]}
              icon={faUsers}
            />
            <span className={styles["video-content"]}>{viewers}명 시청중</span>
            <FontAwesomeIcon
              className={styles["video-content"]}
              icon={faCoins}
            />
            <span className={styles["video-content"]}>{totalCoin}</span>
          </div>
        )}
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

type ReadyStreamingProps = {};

const ReadyStreaming = ({}: ReadyStreamingProps) => {
  const onClick = () => {
    alert("방송시작");
  };

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
      <ButtonLarge
        content="스트리밍 시작하기"
        onClick={onClick}
        buttonColor="bg-white-green"
      />
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
          <span>
            {userList.reduce((acc, current) => acc + current.coin, 0)}
          </span>
        </div>
        <div className={styles["donation-box"]}>
          <div>후원 사람 수</div>
          <FontAwesomeIcon className={styles["icon-donation"]} icon={faUsers} />
          <span>{userList.length}</span>
        </div>
      </div>
      <div className={styles.list}>
        {userList.map((user: DonationCardProps) => (
          <DonationCard
            key={user.id}
            id={user.id}
            nickname={user.nickname}
            imageUrl={user.imageUrl}
            coin={user.coin}
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
  coin: number;
};

const DonationCard = ({ id, nickname, imageUrl, coin }: DonationCardProps) => {
  return (
    <>
      <div className={styles.card}>
        <ImageSmall src={imageUrl} alt={nickname} />
        <br />
        <FontAwesomeIcon className={styles["card-text"]} icon={faCoins} />
        <span className={styles["card-text"]}>{coin}</span>

        <div className={styles["card-hover"]}>
          <div className={styles["card-text"]}>{nickname}</div>
        </div>
      </div>
    </>
  );
};

type HomeProps = {
  type: string;
  streaming: {
    onAir: boolean;
    title: string;
    video: string;
    content?: string;
    viewers?: number;
    totalCoin?: number;
  };
};

const Home = ({ type, streaming }: HomeProps) => {
  const userList: DonationCardProps[] = [
    { id: 1, nickname: "첫번째", imageUrl: "", coin: 1234 },
    { id: 2, nickname: "두번째", imageUrl: "", coin: 1 },
    { id: 3, nickname: "세번째", imageUrl: "", coin: 12 },
    { id: 4, nickname: "네번째", imageUrl: "", coin: 123 },
    { id: 5, nickname: "다섯번째", imageUrl: "", coin: 12345 },
    { id: 6, nickname: "여섯번째", imageUrl: "", coin: 123456 },
    { id: 7, nickname: "일곱번째", imageUrl: "", coin: 1234567 },
  ];

  const { onAir, title, video, content, viewers, totalCoin } = streaming;

  return (
    <>
      {type === "user" &&
        (onAir ? (
          <OnAirStreaming
            onAir={onAir}
            title={title}
            video={video}
            content={content}
            viewers={viewers}
            totalCoin={totalCoin}
          />
        ) : (
          <OnAirStreaming onAir={onAir} title="현재 스트리밍 중이 아닙니다." />
        ))}
      {type === "shelter" && <ReadyStreaming />}
      <Donation userList={userList} />
    </>
  );
};

export default Home;
