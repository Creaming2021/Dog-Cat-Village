import React, { useState } from "react";
import styles from "./animal.module.css";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Search } from "../../common/common";

type ListProps = {
  animalList: AnimalCardProps[];
};

const List = ({ animalList }: ListProps) => {
  return (
    <div className={styles.list}>
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

type AnimalCardProps = {
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
    <div className={styles.card}>
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

type AnimalProps = {
  type: string;
};

const Animal = ({ type }: AnimalProps) => {
  const animalList: AnimalCardProps[] = [
    {
      id: 1,
      imageUrl:
        "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 2,
      imageUrl:
        "https://blog.hmgjournal.com/images/contents/article/201603211108-Reissue-pet-family-01.jpg",
      name: "뽀빠이",
      birthday: "2021.02.01",
      age: 1,
      sex: "남",
    },
    {
      id: 3,
      imageUrl:
        "http://img.insight.co.kr/static/2018/09/12/700/z7n04ul8ig3y27w6l6ok.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 4,
      imageUrl:
        "http://c.files.bbci.co.uk/AD6E/production/_104889344_kitten.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 5,
      imageUrl:
        "https://images.mypetlife.co.kr/content/uploads/2019/09/04222847/dog-panting-1024x683.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 6,
      imageUrl:
        "https://images.mypetlife.co.kr/content/uploads/2019/09/04222847/dog-panting-1024x683.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 7,
      imageUrl:
        "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
    {
      id: 8,
      imageUrl:
        "https://blog.hmgjournal.com/images/contents/article/201603211108-Reissue-pet-family-01.jpg",
      name: "뽀빠이",
      birthday: "2021.02.01",
      age: 1,
      sex: "남",
    },
    {
      id: 9,
      imageUrl:
        "http://img.insight.co.kr/static/2018/09/12/700/z7n04ul8ig3y27w6l6ok.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: 1,
      sex: "여",
    },
  ];

  const [searchInput, setSearchInput] = useState({
    keyword: "",
    type: "all",
  });

  const onOpenManage = () => {
    alert("동물 등록");
  }

  const selectList = [
    {
      name: "type",
      options: [
        { value: "all", option: "모두" },
        { value: "dog", option: "개" },
        { value: "cat", option: "고양이" },
        { value: "etc", option: "기타" },
      ],
    },
  ];

  const onSearch = (): void => {
    alert("검색 요청");
  };

  const onChange = ( e: React.ChangeEvent<HTMLSelectElement>
      							| React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setSearchInput({
			...searchInput,
			[name]: value,
		});
	};

  return (
    <div className={styles["animal-container"]}>
      <Search
        selectList={selectList}
        selectValue={[searchInput.type]}
        inputName="keyword"
        inputValue={searchInput.keyword}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="동물 이름"
        inputSize="input-medium"/>

      {type === "center" && (
        <button
          className={`${styles["btn-manage"]}`}
          onClick={onOpenManage}>동물 등록 </button>
      )}
      <List animalList={animalList} />
    </div>
  );
};

export default Animal;