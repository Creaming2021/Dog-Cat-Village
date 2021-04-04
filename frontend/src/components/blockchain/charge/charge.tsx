import React from "react";
import { ButtonMedium } from "../../common/common";

type ChargeProps = {
  onClose: () => void,
  onSubmitCharge: () => void,
}

const Charge = ({ onClose, onSubmitCharge }: ChargeProps) => {
  return <>
    충전 페이지 입니다.

    <ButtonMedium
      content="충전 하기"
      onClick={onSubmitCharge}
      buttonColor="bg-blue"/>
    <ButtonMedium
      content="충전 취소"
      onClick={onClose}
      buttonColor="bg-yellow"/>
  </>;
};

export default Charge;
