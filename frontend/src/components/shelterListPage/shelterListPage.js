import React from 'react';
import ShelterListItem from './shelterListItem';
import styles from './shelterListPage.module.css';

const shelterList = [
  {
    img: "https://picsum.photos/345/480",
    shelterName: "동렬 아저씨의 동물농장",
    introduction: "안녕하세용 :)",
    amount: "252346",
    viewer: "123"

  },
  {
    img: "https://picsum.photos/345/481",
    shelterName: "해피 도그",
    introduction: "행복한 개",
    amount: "2436",
    viewer: "33"
  },
  {
    img: "https://picsum.photos/345/482",
    shelterName: "캣 하우스",
    introduction: "캣캣 하우스 :)",
    amount: "30565",
    viewer: "7544"
  },
  {
    img: "https://picsum.photos/346/480",
    shelterName: "몽키 몽키",
    introduction: "바나나 키킥",
    amount: "243",
    viewer: "23"
  },
  {
    img: "https://picsum.photos/346/481",
    shelterName: "돼지 피그",
    introduction: "확찐자 돼지",
    amount: "76046",
    viewer: "5238"
  },
  {
    img: "https://picsum.photos/346/482",
    shelterName: "몽몽이",
    introduction: "댕댕이 댕댕",
    amount: "42000",
    viewer: "75123"
  },
  {
    img: "https://picsum.photos/347/480",
    shelterName: "냥냥이 커넥트",
    introduction: "냥냥이 냥냥",
    amount: "346000",
    viewer: "286123"
  },
  {
    img: "https://picsum.photos/347/481",
    shelterName: "고양이는 귀엽다",
    introduction: "안녕 고양이는 귀엽다:)",
    amount: "2540",
    viewer: "235"
  },
  {
    img: "https://picsum.photos/347/482",
    shelterName: "강아지도 귀엽다",
    introduction: "귀엽다 강아지",
    amount: "76060",
    viewer: "6123"
  },
  {
    img: "https://picsum.photos/345/483",
    shelterName: "매니 도네이션",
    introduction: "플리즈 many donation",
    amount: "979",
    viewer: "889"
  }
]


function ShelterListPage() {
  return (
    <div className={styles['main-container']}>
      {
        shelterList.map((data) => {
          return <ShelterListItem data={data} />;
        })
      }
    </div>
  );
};

export default ShelterListPage;