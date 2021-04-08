import React, { useRef, useState } from "react";
import styles from "./home.module.css";
import commons from "../../common/common.module.css";
import {
  faBroadcastTower,
  faUsers,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonLarge, ImageSmall } from "../../common/common";
import PresenterContainer from "../../../containers/presenterContainer";
import UserStreamingPage from "../../userStreamingPage/userStreamingPage";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../modules";

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
  type: string,
  shelterId: number,
  memberId: number | undefined,
};

const Home = ({ type, shelterId, memberId }: HomeProps) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/streaming/${shelterId}/${memberId}`)
  }
  
  return (
    <>
      { type === "CONSUMER" && 
        <ButtonLarge 
          content="방송 보기" 
          onClick={onClick} 
          buttonColor="bg-blue"/> }
      { type === "SHELTER" && <PresenterContainer />}
      {/* <Donation userList={userList} /> */}
    </>
  );
};

export default Home;
