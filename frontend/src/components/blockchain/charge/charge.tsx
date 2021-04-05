import React, { useState } from "react";
import { ButtonMedium } from "../../common/common";
import styles from './charge.module.css';
import commons from '../../common/common.module.css';

type ChargeProps = {
  onClose: () => void,
  onSubmitCharge: (amount: string) => void,
}

const Charge = ({ onClose, onSubmitCharge }: ChargeProps) => {
  const [money, setMoney] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setMoney( value );
  };

  const onClick = () => {
    onSubmitCharge(money);
  }
  
  return (
  <div className={styles['charge-container']}>
    <input 
      className={commons['input-large']}
      value={money}
      onChange={onChange}
      placeholder="충전하실 금액을 입력하세요."/>
    <div>
      <ButtonMedium
        content="충전 하기"
        onClick={onClick}
        buttonColor="bg-blue"/>
      <ButtonMedium
        content="충전 취소"
        onClick={onClose}
        buttonColor="bg-yellow"/>
    </div>
  </div>);
};

export default Charge;
