import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AdoptAction from '../modules/adopt';
import AdoptDetail from "../components/adopt/adoptDetail/adoptDetail";
import AdoptList from "../components/adopt/adoptList/adoptList";
import { Search } from "../components/common/common";
import { AdoptDetailType, AdoptListType } from "../interface/adopt";
import { RootState } from "../modules";

const AdoptContainer = () => {
  const member = useSelector((state: RootState) => state.member.memberInfo);
  const adoptList = useSelector((state: RootState) => state.adopt.adoptList);
  const selectedAdopt = useSelector((state: RootState) => state.adopt.selectedAdopt);
  const dispatch = useDispatch();

  useEffect(() => {
    getAdoptList();
  }, []);

  const [searchInput, setSearchInput] = useState({
    adopt: "",
    type: "member",
    input: "",
  });

  const [resultAdoptList, setResultAdoptList] = useState<AdoptListType[]>(
    adoptList.data || []
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
        adoptList.data 
          ? adoptList.data.filter(
            (adopt) =>
              (adopt.acceptStatus.includes(searchInput.adopt) &&
              adopt.name &&
              adopt.name.includes(searchInput.input))
            )
          : []
      );
    } else if (searchInput.type === "pet") {
      setResultAdoptList(
        adoptList.data 
        ? adoptList.data.filter(
          (adopt) =>
            adopt.acceptStatus.includes(searchInput.adopt) &&
            adopt.petName.includes(searchInput.input)
          )
        : []
      );
    }
  };

  // 입양 신청서 목록 조회하기
  const getAdoptList = () => {
    if(member.data?.memberRole === "SHELTER"){
      dispatch(AdoptAction.getShleterAdoptListAsync.request(member.data.memberId));
    }else if(member.data?.memberRole === "CONSUMER"){
      dispatch(AdoptAction.getConsumerAdoptListAsync.request(member.data.memberId));
    }
  }

  // 목록으로 돌아올 때 디테일 정보 지우기
  const goToBack = () => {
    dispatch(AdoptAction.setInitialAdoptDetail());
  };

  // 입양 신청서 하나 클릭시 디테일 정보 요청
  const onClick = (adoptId: number) => {
    if(member.data?.memberRole === "SHELTER") {
      dispatch(AdoptAction.getShelterAdoptDetailAsync.request({ id: member.data?.memberId, adoptId}));
    }else if(member.data?.memberRole === "CONSUMER") {
      dispatch(AdoptAction.getConsumerAdoptDetailAsync.request({ id: member.data?.memberId, adoptId}));
    }
  };

  // 입양 신청서 상태 변경
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    
    member.data && selectedAdopt.data && 
    dispatch(AdoptAction.changeAdoptStatusAsync.request(
      { id: member.data?.memberId, adoptId: selectedAdopt.data?.id, status: value }));
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
      {member.data && 
        (selectedAdopt.data?.id ? (
          <AdoptDetail
            selectedAdopt={selectedAdopt.data}
            role={member.data?.memberRole}
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
              role={member.data?.memberRole}
              onClick={onClick}
            />
          </>
        ))}
    </>
  );
};

export default AdoptContainer;
