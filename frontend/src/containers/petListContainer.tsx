import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from '../components/nav/nav';
import Pet from "../components/shelter/pet/pet";
import * as PetActions from '../modules/pet';
import { RootState } from "../modules";
import { PetEditType, PetProfileImage } from "../interface/pet";
import styles from './container.module.css';

const PetListContainer = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const shelter = useSelector((state: RootState) => state.member.shelterInfo);
  const petList = useSelector((state: RootState) => state.pet.petList);
  const selectedPet = useSelector((state: RootState) => state.pet.selectedPet);
  const dispatch = useDispatch();

  // 동물 리스트 조회
  const onGetPetList = () => {
    dispatch(PetActions.getPetListAsync.request(0));
  }

  // 보호소 동물 리스트 조회
  const onGetShelterPetList = () => {
    if(shelter.data) {
      dispatch(PetActions.getShelterPetListAsync.request(shelter.data.id));
    }
  }

  // 반려동물 등록
  const onRegisterPet = (petEditType : PetEditType) => {
    dispatch(PetActions.registerPetAsync.request(petEditType));
  }

  // 반려동물 조회
  const onGetPet = (id: number) => {
    dispatch(PetActions.getPetAsync.request(id));
  }

  // 반려동물 수정
  const onModifyPet = (petEditType : PetEditType) => {
    dispatch(PetActions.modifyPetAsync.request(petEditType));
  }

  // 반려동물 삭제
  const onDeletePet = (id: number) => {
    dispatch(PetActions.deletePetAsync.request(id));
  }

  // 반려동물 이미지 삽입
  const onSetProfileImage = (profileImage: PetProfileImage) => {
    dispatch(PetActions.setProfileImageAsync.request(profileImage));
  }

  // 선택된 반려동물 삭제
  const onSetInitialSelectedPet = () => {
    dispatch(PetActions.setInitialSelectedPet());
  }

  useEffect(() => {
    if(member.data && member.data.memberRole === "CONSUMER"){
      onGetPetList();
    }else if(member.data && member.data.memberRole === "SHELTER"){
      onGetShelterPetList();
    }
  }, []);

  return (
  <div className={`${styles['pet-list-container']}
                   ${member.data?.memberRole === 'CONSUMER' && styles.consumer}`}>
    { shelter.data
    ? <Pet
        role={member.data?.memberRole}
        petList={petList.data}
        selectedPet={selectedPet.data}
        shelterId={shelter.data.id}
        onRegisterPet={onRegisterPet}
        onGetPet={onGetPet}
        onModifyPet={onModifyPet}
        onDeletePet={onDeletePet}
        onSetProfileImage={onSetProfileImage}
        onSetInitialSelectedPet={onSetInitialSelectedPet}/>
    : <>
        <Nav role={member.data?.memberRole || ''} memberId={member.data?.memberId || -1}/>
        <Pet
          role={member.data?.memberRole}
          petList={petList.data}
          selectedPet={selectedPet.data}
          onRegisterPet={onRegisterPet}
          onGetPet={onGetPet}
          onModifyPet={onModifyPet}
          onDeletePet={onDeletePet}
          onSetInitialSelectedPet={onSetInitialSelectedPet}/>
      </>
    }
 </div>);
};

export default PetListContainer;