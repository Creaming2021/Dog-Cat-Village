import React, { useEffect, useRef, useState } from "react";
import {
  ButtonSmall,
  Select,
  selectType,
  optionType,
} from "../../../common/common";
import styles from "./editPetForm.module.css";
import commons from "../../../common/common.module.css";
import { PetInputType, PetProfileImage } from "../../../../interface/pet";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EditAnimalFormProps = {
  type: string;
  pet?: PetInputType;
  shelterId: number;
  onCancle: () => void;
  onRegister?: (input: PetInputType) => void;
  onModify?: (petInputType : PetInputType) => void;
  onRegisterImage?: (input: PetProfileImage) => void;
};

const EditAnimalForm = ({
  type,
  pet,
  shelterId,
  onRegister,
  onModify,
  onCancle,
  onRegisterImage
}: EditAnimalFormProps) => {
  const initialState: PetInputType = {
    id: pet ? pet.id : -1,
    profileImage: pet ? pet.profileImage : "",
    name: pet ? pet.name : "",
    breed: pet ? pet.breed : "",
    weight: pet ? pet.weight : "",
    year: pet ? pet.year : "생년",
    month: pet ? pet.month : "월",
    date: pet ? pet.date : "일",
    breedType: pet ? pet.breedType : "dog",
    personality: pet ? pet.personality : "",
    condition: pet ? pet.condition : "",
    sex: pet ? pet.sex : "",
    neuter: pet ? pet.neuter : "",
    shelterId: pet? pet.shelterId: shelterId,
    file: undefined,
  };

  const [input, setInput] = useState<PetInputType>(initialState);
  const [birthday, setBirthday] = useState<selectType[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');


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
        file: e.target.files[0]
      });
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const inputRef = useRef<any>();
  const back_img_ref = useRef<any>();

  const onSubmitRegister = () => {
    if(onRegister) {
      onRegister(input);
    }
  }

  const onSubmitModify = () => {
    if(onModify) {
      onModify(input);
      if(onRegisterImage && input.file){
        onRegisterImage({
          file: input.file,
          petId: pet?.id || -1,
        });
      }
    }
  }
  
  const onButtonClick = (event: any) => {
    event.preventDefault();
    inputRef.current.click();
  }

  return (
    <table className={styles["register-pet-form-container"]}>
      <tbody>
        <tr>
          <td rowSpan={8}>
            <div className={styles['image-box']}>
              <section className={styles.image} ref={back_img_ref}>
                <img className={styles.image} src={imageUrl || input.profileImage}></img>
              </section>
              <section className={styles['image-upload']}>
                <input
                  ref={inputRef}
                  className={styles['img-input-tag']}
                  type="file"
                  name="imageUrl"
                  onChange={onChangeImage}
                  />
                <button 
                  className={`${styles['image-upload-btn']} ${commons['bg-blue']}`} 
                  onClick={onButtonClick}>
                    <FontAwesomeIcon icon={faUpload} className={styles.icon}/> 이미지 넣기
                </button>
              </section>
            </div>
          </td>
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
              <div className={styles['modal-button']}>
                <ButtonSmall
                  content="등록"
                  onClick={onSubmitRegister}
                  buttonColor="bg-blue"
                />
                <ButtonSmall
                  content="취소"
                  onClick={onCancle}
                  buttonColor="bg-yellow"
                />
              </div>
            )}
            {type === "modify" && onModify && (
              <div className={styles['modal-button']}>
                <ButtonSmall
                  content="수정 완료"
                  onClick={onSubmitModify}
                  buttonColor="bg-blue"
                />
                <ButtonSmall
                  content="수정 취소"
                  onClick={onCancle}
                  buttonColor="bg-yellow"
                />
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EditAnimalForm;
