import React, { useState } from "react";
import styles from "./animal.module.css";
import { Search, ButtonSmall, ModalMedium } from "../../../../common/common";
import AnimalList from "../../../../list/animal/animalList/animalList";
import { AnimalListType, AnimalInputType } from '../../../../../interface/animal';
import  EditAnimalForm  from "../../../../list/animal/editAnimalForm/editAnimalForm";

type AnimalProps = {
  type: string;
};

const Animal = ({ type }: AnimalProps) => {
  const animalList: AnimalListType[] = [
    {
      id: 1,
      imageUrl:
        "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "1살",
      sex: "여",
      breedType: "CAT",
    },
    {
      id: 2,
      imageUrl:
        "https://blog.hmgjournal.com/images/contents/article/201603211108-Reissue-pet-family-01.jpg",
      name: "뽀빠이",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "남",
      breedType: "DOG",
    },
    {
      id: 3,
      imageUrl:
        "http://img.insight.co.kr/static/2018/09/12/700/z7n04ul8ig3y27w6l6ok.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "ETC",
    },
    {
      id: 4,
      imageUrl:
        "http://c.files.bbci.co.uk/AD6E/production/_104889344_kitten.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "DOG",
    },
    {
      id: 5,
      imageUrl:
        "https://images.mypetlife.co.kr/content/uploads/2019/09/04222847/dog-panting-1024x683.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "DOG",
    },
    {
      id: 6,
      imageUrl:
        "https://images.mypetlife.co.kr/content/uploads/2019/09/04222847/dog-panting-1024x683.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "DOG",
    },
    {
      id: 7,
      imageUrl:
        "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "DOG",
    },
    {
      id: 8,
      imageUrl:
        "https://blog.hmgjournal.com/images/contents/article/201603211108-Reissue-pet-family-01.jpg",
      name: "뽀빠이",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "남",
      breedType: "DOG",
    },
    {
      id: 9,
      imageUrl:
        "http://img.insight.co.kr/static/2018/09/12/700/z7n04ul8ig3y27w6l6ok.jpg",
      name: "뽀삐",
      birthday: "2021.02.01",
      age: "3개월",
      sex: "여",
      breedType: "DOG",
    },
  ];

  const animal: AnimalInputType = {
    id: 1,
		imageUrl: "https://i.pinimg.com/originals/87/97/b8/8797b830f3d85fdb96f6ad87ef9fc4fe.jpg",
		name: "이름", 
		breed: "품종",
		weight: '45', 
		breedType: "CAT",
		personality: "성격",
		condition: "건강상태",
		sex: 'MALE', 
		neuter: 'NO',
    year: '2021',
    month: '3',
    date: '2',
	}

  const [searchInput, setSearchInput] = useState({
    keyword: "",
    type: "all",
  });

  const [registerAnimal, setRegisterAnimal] = useState(false);
  const [modifyAnimal, setModifyAnimal] = useState(false);

  const onOpenRegister = () => {
    setRegisterAnimal(true);
  }

  const onCloseRegister = () => {
    setRegisterAnimal(false);
  }

  const onOpenModify = () => {
    setModifyAnimal(true);
  }

  const onCloseModify = () => {
    setModifyAnimal(false);
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

  const onSubmitRegister = (): void => {
    alert("동물 등록 요청");
    onCloseRegister();
  }

  const onSubmitModify = (): void => {
    alert("동물 수정 요청");
    onCloseModify();
  }

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
          <EditAnimalForm
            type="register"
            onRegister={onSubmitRegister}
            onCancle={onCloseRegister}/>
        </ModalMedium>
      }
      {modifyAnimal &&
        <ModalMedium>
          <EditAnimalForm
            type="modify"
            animal={animal}
            onModify={onSubmitModify}
            onCancle={onCloseModify}/>
        </ModalMedium>
      }
    </div>
  );
};

export default Animal;