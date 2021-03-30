import React, { useEffect, useState } from "react";
import styles from "./animalList.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalMedium } from "../../../common/common";
import { PetDetailType, PetListType, PetInputType } from "../../../../interface/pet";
import DetailAnimalForm from "../detailAnimalForm/detailAnimalForm";
import EditAnimalForm from "../editAnimalForm/editAnimalForm";

export type AnimalCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  birthday: string;
  age: string;
  sex: string;
  onClick: (e: any) => void;
};

const AnimalCard = ({
  id,
  imageUrl,
  name,
  birthday,
  age,
  sex,
  onClick,
}: AnimalCardProps) => {
  useEffect(() => {}, []);

  return (
    <div
      id={id.toString()}
      onClick={onClick}
      className={styles["animal-card-container"]}
    >
      <img src={imageUrl} />
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

type AnimalListProps = {
  petList: PetListType[];
  selectedPet: PetDetailType;
};

const AnimalList = ({ petList, selectedPet }: AnimalListProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("");
  const [inputPet, setInputPet] = useState<PetInputType>();

  const userInfo = {
    shelterId: 1,
  };

  const onClick = (e: any) => {
    setSelectedAnimal(e.target.id);
    onGoToDetail();
  };

  const onGoToDetail = () => {
    setModal(true);
    setMode("DETAIL");
  };

  const onAdapting = () => {
    alert("입양 신청 폼 이동");
    setMode("ADOPT");
  };

  const onClose = () => {
    setModal(false);
  };

  const onGoToModify = () => {
    setInputPet({
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
      <div className={styles["animal-list-container"]}>
        {petList.map((pet: PetListType) => (
          <AnimalCard
            key={pet.id}
            id={pet.id}
            imageUrl={pet.profileImage}
            name={pet.name}
            birthday={pet.birthday}
            age={pet.age}
            sex={pet.sex}
            onClick={onClick}
          />
        ))}
      </div>

      {(modal && mode === "DETAIL" && (
        <ModalMedium>
          <DetailAnimalForm
            userInfo={userInfo}
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
            <EditAnimalForm
              type="modify"
              pet={inputPet}
              onModify={onModify}
              onCancle={onGoToDetail}
            />
          </ModalMedium>
        )) ||
        (mode === "ADOPT" && <ModalMedium>입양</ModalMedium>)}
    </>
  );
};

export default AnimalList;
