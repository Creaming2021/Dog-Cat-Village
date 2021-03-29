import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AdoptAction from '../modules/adopt';
import AdoptDetail from "../components/adopt/adoptDetail/adoptDetail";
import AdoptList from "../components/adopt/adoptList/adoptList";
import { Search } from "../components/common/common";
import { AdoptDetailType, AdoptListType } from "../interface/adopt";

const AdoptContainer = () => {
  const userInfo: any = useSelector((state: any) => state.user.userInfo);
  const adoptList: AdoptListType[] = useSelector((state: any) => state.adopt.adoptList);
  const selectedAdopt: AdoptDetailType = useSelector((state: any) => state.adopt.selectedAdopt);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState({
    adopt: "",
    type: "member",
    input: "",
  });

  const [resultAdoptList, setResultAdoptList] = useState<AdoptListType[]>(
    adoptList
  );

  const onChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setSearchInput({
      ...searchInput,
      [name]: value,
    });
  };

  const onSearch = () => {
    if (searchInput.type === "member") {
      setResultAdoptList(
        adoptList.filter(
          (adopt) =>
            adopt.acceptStatus.includes(searchInput.adopt) &&
            adopt.name &&
            adopt.name.includes(searchInput.input)
        )
      );
    } else if (searchInput.type === "pet") {
      setResultAdoptList(
        adoptList.filter(
          (adopt) =>
            adopt.acceptStatus.includes(searchInput.adopt) &&
            adopt.petName.includes(searchInput.input)
        )
      );
    }
  };

  // 목록으로 돌아올 때 디테일 정보 지우기
  const goToBack = () => {
    dispatch(AdoptAction.setInitialAdoptDetail())
    .then()
    .catch();
  };

  // 입양 신청서 하나 클릭시 디테일 정보 요청
  const onClick = (adoptId: number) => {
    dispatch(AdoptAction.getShelterAdoptDetail({ id: userInfo.id, adoptId}))
    .then()
    .catch();
  };

  // 입양 신청서 상태 변경
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    dispatch(AdoptAction.changeAdoptStatus(
      { id: userInfo.id, adoptId: selectedAdopt.id, status: value }))
    .then()
    .catch();
  };

  const selectList = [
    {
      name: "adopt",
      options: [
        { value: "", option: "모두" },
        { value: "ACCEPTED", option: "입양 완료" },
        { value: "PENDING", option: "진행 중" },
        { value: "REFUSED", option: "입양 거절" },
      ],
    },
    {
      name: "type",
      options: [
        { value: "member", option: "유저" },
        { value: "pet", option: "동물" },
      ],
    },
  ];

  return (
    <>
      {selectedAdopt.id ? (
        <AdoptDetail
          selectedAdopt={selectedAdopt}
          role={userInfo.role}
          goToBack={goToBack}
          onSubmit={onSubmit}
        />
      ) : (
        <>
          <Search
            selectList={selectList}
            selectValue={[searchInput.adopt, searchInput.type]}
            inputName="input"
            inputValue={searchInput.input}
            onSearch={onSearch}
            onChange={onChange}
            placeholder="검색어"
            inputSize="input-medium"
          />
          <AdoptList
            adoptList={resultAdoptList}
            role={userInfo.role}
            onClick={onClick}
          />
        </>
      )}
    </>
  );
};

export default AdoptContainer;
