import React from "react";
import styles from "./detailPetForm.module.css";
import { PetDetailType } from "../../../../interface/pet";
import { ButtonSmall } from "../../../common/common";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type DetailPetFormProps = {
  memberShelterId?: number;
  pet: PetDetailType;
  onClose: () => void;
  onSubmit: () => void;
  onGoToModify: () => void;
  onDelete: (id: number) => void;
};

const DetailPetForm = ({
  memberShelterId,
  pet,
  onClose,
  onSubmit,
  onGoToModify,
  onDelete,
}: DetailPetFormProps) => {
  const {
    id,
    age,
    profileImage,
    name,
    breed,
    weight,
    birthday,
    breedType,
    personality,
    condition,
    sex,
    neuter,
    shelterId,
  } = pet;

  const onSubmitDelete = () => {
    onDelete(id);
  }

  return (
    <div className={styles["detail-pet-form-container"]}>
      <table>
        <tbody>
          <tr>
            <td>
              <img
                src={profileImage}
                alt="파일을 업로드하세요"
                className={styles.image}
              />
            </td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td colSpan={2}>{name}</td>
                  </tr>
                  <tr>
                    <td>성별</td>
                    <td>
                      {sex === "MALE" && "남"}
                      {sex === "FEMALE" && "여"}
                    </td>
                  </tr>
                  <tr>
                    <td>품종</td>
                    <td>
                      {breed}( {breedType === "DOG" && "개"}
                      {breedType === "CAT" && "고양이"}
                      {breedType === "ETC" && "기타"} )
                    </td>
                  </tr>
                  <tr>
                    <td>나이</td>
                    <td>
                      {age} ( {birthday} )
                    </td>
                  </tr>
                  <tr>
                    <td>몸무게</td>
                    <td>{weight}kg</td>
                  </tr>
                  <tr>
                    <td>중성화</td>
                    <td>
                      {neuter === "YES" && "함"}
                      {neuter === "NO" && "안함"}
                      {neuter === "PLAN" && "수술 예정"}
                    </td>
                  </tr>
                  <tr>
                    <td>성격</td>
                    <td>{personality}</td>
                  </tr>
                  <tr>
                    <td>건강 상태</td>
                    <td>{condition}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {shelterId === memberShelterId ? (
                        <>
                          <ButtonSmall
                            content="수정"
                            onClick={onGoToModify}
                            buttonColor="bg-blue"
                          />
                          <ButtonSmall
                            content="삭제"
                            onClick={onSubmitDelete}
                            buttonColor="bg-blue"
                          />
                        </>
                      ) : (
                        <ButtonSmall
                          content="입양 신청"
                          onClick={onSubmit}
                          buttonColor="bg-blue"
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <FontAwesomeIcon
        className={styles["icon-close"]}
        icon={faTimesCircle}
        onClick={onClose}
      />
    </div>
  );
};

export default DetailPetForm;
