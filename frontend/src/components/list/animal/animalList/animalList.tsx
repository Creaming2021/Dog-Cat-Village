import React, { useEffect, useState } from "react";
import styles from "./animalList.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalMedium } from "../../../common/common";
import { AnimalDetailType, AnimalListType, AnimalInputType } from "../../../../interface/animal";
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
  animalList: AnimalListType[];
};

const AnimalList = ({ animalList }: AnimalListProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("");
  const [inputAnimal, setInputAnimal] = useState<AnimalInputType>();

  const userInfo = {
    shelterId: 1,
  };

  const animal: AnimalDetailType = {
    id: 1,
    age: "2살",
    birthday: "20210301",
    imageUrl:
      "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
    name: "이름",
    breed: "품종",
    weight: "45",
    breedType: "CAT",
    personality: "성격",
    condition: "건강상태",
    sex: "MALE",
    neuter: "NO",
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
    setInputAnimal({
      id: animal.id,
      name: animal.name,
      imageUrl: animal.imageUrl,
      sex: animal.sex,
      breedType: animal.breedType,
      weight: animal.weight,
      breed: animal.breed,
      personality: animal.personality,
      neuter: animal.neuter,
      condition: animal.condition,
      year: animal.birthday.substr(0, 4),
      month: animal.birthday.substr(4, 2),
      date: animal.birthday.substr(6, 2),
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
        {animalList.map((animal: AnimalListType) => (
          <AnimalCard
            key={animal.id}
            id={animal.id}
            imageUrl={animal.imageUrl}
            name={animal.name}
            birthday={animal.birthday}
            age={animal.age}
            sex={animal.sex}
            onClick={onClick}
          />
        ))}
      </div>

      {(modal && mode === "DETAIL" && (
        <ModalMedium>
          <DetailAnimalForm
            userInfo={userInfo}
            animal={animal}
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
              animal={inputAnimal}
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
