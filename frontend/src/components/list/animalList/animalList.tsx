import React from "react";
import styles from "./animalList.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type AnimalCardProps = {
  id: number;
  imageUrl: string;
  name: string;
  birthday: string;
  age: number;
  sex: string;
};

const AnimalCard = ({
  imageUrl,
  name,
  birthday,
  age,
  sex,
}: AnimalCardProps) => {
  return (
    <div className={styles['animal-card-container']}>
      <img src={imageUrl} />
      <div className={styles["card-hover"]}>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.age}>
            {age} 살 /
            {sex === "여" ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : (
              <FontAwesomeIcon icon={faMars} />
            )}
          </div>
          <div className={styles.birthday}>{birthday}</div>
        </div>
      </div>
    </div>
  );
};

type AnimalListProps = {
  animalList: AnimalCardProps[];
};

const AnimalList = ({ animalList }: AnimalListProps) => {
  return (
    <div className={styles['animal-list-container']}>
      {animalList.map((animal: AnimalCardProps) => (
        <AnimalCard
          key={animal.id}
          id={animal.id}
          imageUrl={animal.imageUrl}
          name={animal.name}
          birthday={animal.birthday}
          age={animal.age}
          sex={animal.sex}
        />
      ))}
    </div>
  );
};

export default AnimalList;