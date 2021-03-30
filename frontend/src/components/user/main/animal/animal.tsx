import React, { useEffect, useState } from "react";
import styles from "./animal.module.css";
import { Search, ButtonSmall, ModalMedium } from "../../../common/common";
import AnimalList from "../../../list/animal/animalList/animalList";
import { PetListType, PetDetailType } from '../../../../interface/pet';
import  EditAnimalForm  from "../../../list/animal/editAnimalForm/editAnimalForm";

type AnimalProps = {
  role: string;
  petList: PetListType[];
  selectedPet: PetDetailType;
};

const Animal = ({ role, petList, selectedPet }: AnimalProps) => {
  const [resultPetList, setResultPetList] = useState<PetListType[]>(petList);
  const [searchInput, setSearchInput] = useState({
    keyword: "",
    type: "",
  });
  const [registerPet, setRegisterPet] = useState(false);

  const onOpenRegister = () => {
    setRegisterPet(true);
  }

  const onCloseRegister = () => {
    setRegisterPet(false);
  }

  const selectList = [
    {
      name: "type",
      options: [
        { value: "", option: "모두" },
        { value: "DOG", option: "개" },
        { value: "CAT", option: "고양이" },
        { value: "ETC", option: "기타" },
      ],
    },
  ];

  const onSearch = (): void => {
    setResultPetList(
      petList.filter(pet => 
        pet.breedType.includes(searchInput.type) 
        && pet.name.includes(searchInput.keyword))
    );
  };

  useEffect(()=> {
    console.log(searchInput, resultPetList);
  }, [resultPetList]);

  const onSubmitRegister = (): void => {
    alert("동물 등록 요청");
    onCloseRegister();
  }

  const onChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ): void => {
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
        inputSize="input-medium"
      />

      {role === "SHELTER" && (
        <ButtonSmall
          content="동물 등록"
          onClick={onOpenRegister}
          buttonColor="bg-green"
        />
      )}

      <div className={styles["animal-list"]}>
        <AnimalList 
          petList={resultPetList} 
          selectedPet={selectedPet}/>
      </div>

      {registerPet && (
        <ModalMedium>
          <EditAnimalForm
            type="register"
            onRegister={onSubmitRegister}
            onCancle={onCloseRegister}
          />
        </ModalMedium>
      )}
    </div>
  );
};

export default Animal;