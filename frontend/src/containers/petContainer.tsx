import { stat } from "node:fs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Animal from "../components/user/main/animal/animal";

const PetContainer = () => {
  const member = useSelector((state: any) => state.member);
  const petList = useSelector((state: any) => state.pet.petList);
  const selectedPet = useSelector((state: any) => state.pet.selectedPet);
  const dispatch = useDispatch();

  // 보호소 동물 리스트 조회

  // 반려동물 등록

  // 반려동물 조회

  // 반려동물 수정

  // 반려동물 삭제

  return (
    <Animal
      role={member.role}
      petList={petList}
      selectedPet={selectedPet}/>
  );
};

export default PetContainer;
