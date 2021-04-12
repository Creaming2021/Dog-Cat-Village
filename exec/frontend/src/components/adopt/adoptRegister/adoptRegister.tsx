import React, { useState } from "react";
import styles from "./adoptRegister.module.css";
import { AdoptRegisterType } from "../../../interface/adopt";
import { ButtonSmall } from "../../common/common";

type AdoptRegisterProps = {
  onSubmit: (adoptInputForm: AdoptRegisterType) => void;
  onClose: () => void;
};

const AdoptRegister = ({ onSubmit, onClose }: AdoptRegisterProps) => {
  const [adoptInputForm, setAdoptInputForm] = useState<AdoptRegisterType>({
    petId: 1,
    name: "",
    sex: "",
    age: "",
    address: "",
    description: "",
    day: "",
    time: "",
  });

  const {
    name,
    sex,
    age,
    address,
    description,
    day,
    time,
  } = adoptInputForm;

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setAdoptInputForm({
      ...adoptInputForm,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    onSubmit(adoptInputForm);
  };

  return (
    <table className={styles["adopt-form-container"]}>
      <tbody>
        <tr>
          <td>신청자 성명</td>
          <td colSpan={3}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>성별</td>
          <td colSpan={3}>
            <label>
              <input
                type="radio"
                name="sex"
                value="MALE"
                onChange={onChange}
              />
              남
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="FEMALE"
                onChange={onChange}
              />
              여
            </label>
          </td>
        </tr>
        <tr>
          <td>연령</td>
          <td colSpan={3}>
            <input
              name="age"
              value={age}
              onChange={onChange}
              placeholder="숫자만 입력"
            />
          </td>
        </tr>
        <tr>
          <td>통화하기 편한 요일</td>
          <td>
            <input name="day" value={day} onChange={onChange} />
          </td>
          <td>통화하기 편한 시간</td>
          <td>
            <input name="time" value={time} onChange={onChange} />
          </td>
        </tr>
        <tr>
          <td>사시는 지역</td>
          <td colSpan={3}>
            <input
              type="text"
              name="address"
              value={address}
              onChange={onChange}
              placeholder="서울, 경기 등등 정도만 입력하시면 됩니다."
            />
          </td>
        </tr>
        <tr>
          <td>입양 신청 사유</td>
          <td colSpan={3}>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={4}>
            <ButtonSmall
              content="신청 완료"
              onClick={onClickSubmit}
              buttonColor="bg-blue"
            />
            <ButtonSmall
              content="신청 취소"
              onClick={onClose}
              buttonColor="bg-yellow"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdoptRegister;
