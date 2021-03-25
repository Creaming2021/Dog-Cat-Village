import React, { useState } from "react";
import styles from "./animalList.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalMedium } from "../../../common/common";
import { AnimalDetailType, AnimalListType } from "../../../../interface/animal";
import DetailAnimalForm from "../detailAnimalForm/detailAnimalForm";

export type AnimalCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  birthday: string;
  age: string;
  sex: string;
  onClick: (e:any) => void;
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
  return (
    <div id={id.toString()} onClick={onClick} className={styles['animal-card-container']}>
      <img src={imageUrl} />
      <div id={id.toString()}  className={styles["card-hover"]}>
        <div id={id.toString()} className={styles.info}>
          <div id={id.toString()} className={styles.name}>{name}</div>
          <div id={id.toString()} className={styles.age}>
            {age} /
            {sex === "FEMALE" ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : (
              <FontAwesomeIcon icon={faMars} />
            )}
          </div>
          <div id={id.toString()} className={styles.birthday}>{birthday}</div>
        </div>
      </div>
    </div>
  );
};

type AnimalListProps = {
  animalList: AnimalListType[];
};

const AnimalList = ({ animalList }: AnimalListProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [detailAnimal, setDetailAnimal] = useState(false);
  
	const animal: AnimalDetailType = {
		id: 1,
		age: "2살",
		birthday: "2021.03.01",
		imageUrl: "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
		name: "이름", 
		breed: "품종",
		weight: '45', 
		breedType: "CAT",
		personality: "성격",
		condition: "건강상태",
		sex: 'MALE', 
		neuter: 'NO',
    centerId: 1
	}

  const onClick = (e: any) => {
    setSelectedAnimal(e.target.id);
    setDetailAnimal(true);
    console.log(e);
  }

  const onAdapting = () => {
    alert("입양 신청 폼 이동");
    setDetailAnimal(false);
  }
  
  const onClose = () => {
    setDetailAnimal(false);
  }

  return (<>
    <div className={styles['animal-list-container']}>
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

    {detailAnimal &&
        <ModalMedium>
          <DetailAnimalForm
            animal={animal}
            onSubmit={onAdapting}
            onClose={onClose}/>
        </ModalMedium>
      }
  
  </>);
};

export default AnimalList;