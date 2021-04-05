import React, { useEffect, useState } from "react";
import styles from "./pet.module.css";
import { Search, ButtonSmall, ModalMedium } from "../../common/common";
import PetList from "../../list/pet/petList/petList";
import { PetListType, PetDetailType, PetEditType, PetInputType, PetProfileImage } from '../../../interface/pet';
import  EditPetForm  from "../../list/pet/editPetForm/editPetForm";

type PetProps = {
  role?: string;
  petList: PetListType[] | null;
  selectedPet: PetDetailType | null;
  shelterId: number;
  onRegisterPet: ( petEditType : PetEditType ) => void;
  onGetPet: (id: number) => void;
  onModifyPet: (petEditType : PetEditType) => void;
  onDeletePet: (id: number) => void;
  onSetProfileImage: (profileImage: PetProfileImage) => void;
  onSetInitialSelectedPet: () => void;
};

const Pet = ({ role, petList, selectedPet, shelterId,
            onRegisterPet, onGetPet, 
            onModifyPet, onDeletePet, onSetProfileImage, onSetInitialSelectedPet }: PetProps) => {
              
  const initialState: PetEditType = {
    id: -1,
    profileImage: "",
    name: "",
    breed: "",
    weight: "",
    birthday: '',
    breedType: "",
    personality: "",
    condition:"",
    sex: "",
    neuter: "",
    shelterId: shelterId || -1,
  };

  const [resultPetList, setResultPetList] = useState<PetListType[]>(petList || []);
  const [searchInput, setSearchInput] = useState({
    keyword: "",
    type: "",
  });
  const [registerPet, setRegisterPet] = useState(false);
  const [registerPetInfo, setRegisterPetInfo] = useState(initialState);

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
      petList 
      ? petList.filter(pet => 
          pet.breedType.includes(searchInput.type) 
          && pet.name.includes(searchInput.keyword))
      : []
    );
  };

  useEffect(() => {
    if(registerPetInfo.profileImage){
      onRegisterPet(registerPetInfo);
      onCloseRegister();
    }
  }, [registerPetInfo]);

  const onSubmitRegister = (input: PetInputType): void => {
    setRegisterPetInfo({
      id: -1,
      profileImage: input.profileImage,
      name: input.name,
      breed: input.breed,
      weight: input.weight,
      birthday: input.year + input.month + input.date,
      breedType: input.breedType,
      personality: input.personality,
      condition: input.condition,
      sex: input.sex,
      neuter: input.neuter,
      shelterId: input.shelterId,
    })
  }

  const onSumbitModify = (input: PetInputType): void => {
    setRegisterPetInfo({
      id: -1,
      profileImage: input.profileImage,
      name: input.name,
      breed: input.breed,
      weight: input.weight,
      birthday: input.year + input.month + input.date,
      breedType: input.breedType,
      personality: input.personality,
      condition: input.condition,
      sex: input.sex,
      neuter: input.neuter,
      shelterId: input.shelterId,
    })
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
    <div className={styles["pet-container"]}>
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

      <div className={styles["pet-list"]}>
        <PetList 
          petList={resultPetList} 
          selectedPet={selectedPet}
          shelterId={shelterId}
          onGetPet={onGetPet}
          onModifyPet={onSumbitModify}
          onDeletePet={onDeletePet}
          onSetInitialSelectedPet={onSetInitialSelectedPet}/>
      </div>

      {registerPet && (
        <ModalMedium>
          <EditPetForm
            type="register"
            shelterId={shelterId}
            onRegister={onSubmitRegister}
            onCancle={onCloseRegister}
          />
        </ModalMedium>
      )}
    </div>
  );
};

export default Pet;