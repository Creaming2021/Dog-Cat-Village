import React, { useRef, useState } from "react";
import styles from "../home/home.module.css";
import { ButtonLarge, ImageSmall } from "../../common/common";
import { SignInResponseType } from "../../../interface/member";

type ReadyStreamingProps = {
	member: SignInResponseType | null,
};

const ReadyStreaming = ({ member }: ReadyStreamingProps) => {
  const onClick = () => {
		alert(`방송 시작 처리하시면 됩니다. memberId = ${member?.memberId}`);
  };

  return (
    <div className={styles.streaming}>
      <ButtonLarge
        content="스트리밍 시작하기"
        onClick={onClick}
        buttonColor="bg-white-green"
      />
    </div>
  );
};

export default ReadyStreaming;
