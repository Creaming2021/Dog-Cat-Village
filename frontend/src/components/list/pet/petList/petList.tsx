import React, { useEffect, useState } from "react";
import styles from "./petList.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalMedium } from "../../../common/common";
import { PetDetailType, PetListType, PetInputType } from "../../../../interface/pet";
import DetailPetForm from "../detailPetForm/detailPetForm";
import EditPetForm from "../editPetForm/editPetForm";

export type PetCardProps = {
  id: number;
  profileImage: string;
  name: string;
  birthday: string;
  age: string;
  sex: string;
  onClick: (e: any) => void;
};

const PetCard = ({
  id,
  profileImage,
  name,
  birthday,
  age,
  sex,
  onClick,
}: PetCardProps) => {
  useEffect(() => {}, []);

  return (
    <div
      id={id.toString()}
      onClick={onClick}
      className={styles["pet-card-container"]}
    >
      <img src={profileImage} />
      <div id={id.toString()} className={styles["card-hover"]}>
        <div id={id.toString()} className={styles.info}>
          <div id={id.toString()} className={styles.name}>
            {name}
          </div>
          <div id={id.toString()} className={styles.age}>
            {age} /
            {sex === "FEMALE" ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : (
              <FontAwesomeIcon icon={faMars} />
            )}
          </div>
          <div id={id.toString()} className={styles.birthday}>
            {birthday}
          </div>
        </div>
      </div>
    </div>
  );
};

type PetListProps = {
  petList: PetListType[] | null;
  selectedPet: PetDetailType | null;
  shelterId: number;
  onGetPet: (id: number) => void;
  onSetInitialSelectedPet: () => void;
};

const PetList = ({ petList, selectedPet, shelterId, onGetPet, onSetInitialSelectedPet }: PetListProps) => {
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("");
  const [inputPet, setInputPet] = useState<PetInputType>();

  const onClick = (e: any) => {
    onGetPet(e.target.id);
    onGoToDetail();
  };

  const onGoToDetail = () => {
    setModal(true);
    setMode("DETAIL");
  };

  const onAdapting = () => {
    setMode("ADOPT");
  };

  const onClose = () => {
    onSetInitialSelectedPet();
    setModal(false);
  };

  const onGoToModify = () => {
    selectedPet && setInputPet({
      id: selectedPet.id,
      name: selectedPet.name,
      profileImage: selectedPet.profileImage,
      sex: selectedPet.sex,
      breedType: selectedPet.breedType,
      weight: selectedPet.weight,
      breed: selectedPet.breed,
      personality: selectedPet.personality,
      neuter: selectedPet.neuter,
      condition: selectedPet.condition,
      year: selectedPet.birthday.substr(0, 4),
      month: selectedPet.birthday.substr(4, 2),
      date: selectedPet.birthday.substr(6, 2),
      shelterId: selectedPet.shelterId,
    });
    setMode("MODIFY");
  };

  const onModify = () => {
    alert("수정 요청");
    setMode("DETAIL");
  };

  const onDelete = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      setModal(false);
    }
  };

  return (
    <>
      <div className={styles["pet-list-container"]}>
        { ( !petList || petList.length === 0 )
        ? <>검색 결과가 없습니다.</>
        : petList.map((pet: PetListType) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            profileImage={pet.profileImage}
            name={pet.name}
            birthday={pet.birthday}
            age={pet.age}
            sex={pet.sex}
            onClick={onClick}
          />
        ))
      }
      </div>

      {(modal && mode === "DETAIL" && selectedPet && (
        <ModalMedium>
          <DetailPetForm
            memberShelterId={shelterId}
            pet={selectedPet}
            onSubmit={onAdapting}
            onClose={onClose}
            onGoToModify={onGoToModify}
            onDelete={onDelete}
          />
        </ModalMedium>
      )) ||
        (mode === "MODIFY" && (
          <ModalMedium>
            <EditPetForm
              type="modify"
              pet={inputPet}
              shelterId={shelterId}
              onModify={onModify}
              onCancle={onGoToDetail}
            />
          </ModalMedium>
        )) ||
        (mode === "ADOPT" && <ModalMedium>입양</ModalMedium>)}
    </>
  );
};

export default PetList;
