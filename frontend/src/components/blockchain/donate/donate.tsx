import React, { useState } from "react";
import { ButtonMedium } from "../../common/common";
import commons from '../../common/common.module.css';
import styles from './donate.module.css';

type DonateProp = {
  onClose: () => void,
  onDonation: () => void,
  balance: number,
}

const Donate = ({ onClose, onDonation, balance }: DonateProp) => {
  const [amount, setAmount] = useState<number>(0);

  const onChange = (e: any) => {
    const { value } = e.target.value;

    setAmount(value);
  }

  return (
    <div className={styles['donate-container']}>
      <div className={styles.text}>현재 보유 코인 : {balance}</div>
      <input className={commons['input-large']} name="amount" onChange={onChange} value={amount}/><br/>
      <ButtonMedium onClick={onDonation} content="후원하기" buttonColor="bg-blue" />
      <ButtonMedium onClick={onClose} content="취소하기" buttonColor="bg-yellow" />
    </div>
  );
};

export default Donate;
