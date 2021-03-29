import React, { useEffect, useState } from "react";
import {
  ButtonSmall,
  Select,
  selectType,
  optionType,
} from "../../../common/common";
import styles from "./editAnimalForm.module.css";
import commons from "../../../common/common.module.css";
import { AnimalInputType } from "../../../../interface/animal";

type EditAnimalFormProps = {
  type: string;
  animal?: AnimalInputType;
  onCancle: () => void;
  onRegister?: () => void;
  onModify?: () => void;
};

const EditAnimalForm = ({
  type,
  animal,
  onRegister,
  onModify,
  onCancle,
}: EditAnimalFormProps) => {
  const initialState: AnimalInputType = {
    id: animal ? animal.id : -1,
    imageUrl: animal ? animal.imageUrl : "",
    name: animal ? animal.name : "",
    breed: animal ? animal.breed : "",
    weight: animal ? animal.weight : "",
    year: animal ? animal.year : "생년",
    month: animal ? animal.month : "월",
    date: animal ? animal.date : "일",
    breedType: animal ? animal.breedType : "dog",
    personality: animal ? animal.personality : "",
    condition: animal ? animal.condition : "",
    sex: animal ? animal.sex : "",
    neuter: animal ? animal.neuter : "",
  };

  const [input, setInput] = useState(initialState);
  const [birthday, setBirthday] = useState<selectType[]>([]);

  const typeList: selectType = {
    name: "breedType",
    options: [
      { value: "dog", option: "개" },
      { value: "cat", option: "고양이" },
      { value: "etc", option: "기타" },
    ],
  };

  const year: optionType[] = [{ value: "0", option: "생년" }];
  const month: optionType[] = [{ value: "0", option: "월" }];
  const date: optionType[] = [{ value: "0", option: "일" }];

  useEffect(() => {
    setDate();
  }, []);

  const setDate = () => {
    for (let i: number = 2021; i >= 1980; i--) {
      year.push({ value: i.toString(), option: i.toString() + "년" });
    }

    for (let i: number = 1; i <= 9; i++) {
      month.push({ value: "0" + i.toString(), option: i.toString() + "월" });
      date.push({ value: "0" + i.toString(), option: i.toString() + "일" });
    }

    for (let i: number = 10; i <= 12; i++) {
      month.push({ value: i.toString(), option: i.toString() + "월" });
    }

    for (let i: number = 10; i <= 31; i++) {
      date.push({ value: i.toString(), option: i.toString() + "일" });
    }

    setBirthday(
      birthday
        .concat({ name: "year", options: year })
        .concat({ name: "month", options: month })
        .concat({ name: "date", options: date })
    );
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput({
        ...input,
        imageUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  
  return (
    <table className={styles["register-animal-form-container"]}>
      <tbody>
        <tr>
          <td rowSpan={9}>
            <img
              src={input.imageUrl}
              alt="파일을 업로드하세요"
              className={styles.image}
            />
          </td>
          <td>
            <label htmlFor="img-file" className={commons["btn-text"]}>
              동물 사진 업로드
            </label>
            <input
              type="file"
              id="img-file"
              className={styles["image-upload-tag"]}
              onChange={onChangeImage}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="name"
              value={input.name}
              onChange={onChange}
              placeholder="이름"
            />
            <label>
              <input type="radio" name="sex" value="MALE" onChange={onChange} />{" "}
              남
            </label>
            <label>
              <input type="radio" name="sex" value="FEMALE" onChange={onChange} />{" "}
              여
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <Select
              select={typeList}
              index={0}
              selectValue={[input.breedType]}
              onChange={onChange}
            />
            <input
              name="breed"
              value={input.breed}
              onChange={onChange}
              placeholder="품종"
            />
          </td>
        </tr>
        <tr>
          <td>
            <Select
              select={birthday[0]}
              index={0}
              selectValue={[input.year]}
              onChange={onChange}
            />
            <Select
              select={birthday[1]}
              index={0}
              selectValue={[input.month]}
              onChange={onChange}
            />
            <Select
              select={birthday[2]}
              index={0}
              selectValue={[input.date]}
              onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="weight"
              value={input.weight}
              onChange={onChange}
              placeholder="몸무게"
            />
            kg
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="personality"
              value={input.personality}
              onChange={onChange}
              placeholder="성격"
            />
          </td>
        </tr>
        <tr>
          <td>
            중성화
            <label>
              <input
                type="radio"
                onChange={onChange}
                name="neuter"
                value="YES"
              />{" "}
              함
            </label>
            <label>
              <input
                type="radio"
                onChange={onChange}
                name="neuter"
                value="NO"
              />{" "}
              안함
            </label>
            <label>
              <input
                type="radio"
                onChange={onChange}
                name="neuter"
                value="PLAN"
              />{" "}
              수술 예정
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <input
              name="condition"
              value={input.condition}
              onChange={onChange}
              placeholder="건강상태"
            />
          </td>
        </tr>
        <tr>
          <td>
            {type === "register" && onRegister && (
              <>
                <ButtonSmall
                  content="등록"
                  onClick={onRegister}
                  buttonColor="bg-blue"
                />
                <ButtonSmall
                  content="취소"
                  onClick={onCancle}
                  buttonColor="bg-yellow"
                />
              </>
            )}
            {type === "modify" && onModify && (
              <>
                <ButtonSmall
                  content="수정 완료"
                  onClick={onModify}
                  buttonColor="bg-blue"
                />
                <ButtonSmall
                  content="수정 취소"
                  onClick={onCancle}
                  buttonColor="bg-yellow"
                />
              </>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EditAnimalForm;
