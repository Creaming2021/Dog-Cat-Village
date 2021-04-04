import React from "react";
import { ButtonMedium, Select } from "../../common/common";

type WithrawProps = {
  onClose: () => void,
  onSubmigWithdraw: () => void,
}

const Withraw = ({ onClose, onSubmigWithdraw }: WithrawProps) => {


  return <>
    <div>출금 가능 코인 <input></input></div>
    <div>출금 신청 코인 <input></input></div>
    <div>출금 후 금액 <input></input></div>
    <div>출금 받을 계좌 <input></input></div>

    <ButtonMedium
      content="출금 신청"
      onClick={onSubmigWithdraw}
      buttonColor="bg-blue"/>
    <ButtonMedium
      content="출금 취소"
      onClick={onClose}
      buttonColor="bg-yellow"/>
  </>;
};

export default Withraw;
