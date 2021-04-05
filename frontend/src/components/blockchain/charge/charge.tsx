import React, { useState } from "react";
import { ButtonMedium } from "../../common/common";

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
  
  return <>
    충전 페이지 입니다.
    <input 
      value={money}
      onChange={onChange}
      placeholder="금액을 입력하세요."/>
    <ButtonMedium
      content="충전 하기"
      onClick={onClick}
      buttonColor="bg-blue"/>
    <ButtonMedium
      content="충전 취소"
      onClick={onClose}
      buttonColor="bg-yellow"/>
  </>;
};

export default Charge;
