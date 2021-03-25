import React, { useState } from "react";
import styles from "./animal.module.css";
import { Search, ButtonSmall, ModalMedium } from "../../../../common/common";
import AnimalList, { AnimalCardProps } from "../../../../list/animalList/animalList";
import { RegisterAnimalForm } from "../animalModal/animalModal";

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

  const [registerAnimal, setRegisterAnimal] = useState(false);

  const onOpenRegister = () => {
    setRegisterAnimal(true);
  }

  const onCloseRegister = () => {
    setRegisterAnimal(false);
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
        <ButtonSmall 
					content="동물 등록" 
					onClick={onOpenRegister} 
					buttonColor="bg-green"/>
      )}

			<div className={styles['animal-list']}>
    		<AnimalList animalList={animalList}/>
			</div>

      {registerAnimal && 
        <ModalMedium>
          <RegisterAnimalForm
            onClose={onCloseRegister}/>
        </ModalMedium>
      }
    </div>
  );
};

export default Animal;