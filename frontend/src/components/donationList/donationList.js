import React from 'react';
import style from './donationList.module.css';
import DonationListItem from './donationListItem';


const date = new Date().toDateString();

const DonationDataList = [
  {
    img: "https://picsum.photos/60/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    img: "https://picsum.photos/61/60",
    amount: "-1000 마블",
    transcation: "고양이 아저씨",
    balance : "잔액 150 마블",
    date
  },
  {
    img: "https://picsum.photos/60/61",
    amount: "+1000 마블",
    transcation: "몽키맨",
    balance : "잔액 130 마블",
    date
  },
  {
    img: "https://picsum.photos/61/61",
    amount: "-1000 마블",
    transcation: "피기피기",
    balance : "잔액 102 마블",
    date
  },
  {
    img: "https://picsum.photos/62/60",
    amount: "+1000 마블",
    transcation: "동렬 아저씨의 동물농장",
    balance : "잔액 10 마블",
    date
  },
  {
    img: "https://picsum.photos/60/62",
    amount: "-1000 마블",
    transcation: "마지막 블록체인",
    balance : "잔액 275 마블",
    date
  },
  {
    img: "https://picsum.photos/61/61",
    amount: "+1000 마블",
    transcation: "어벤져스",
    balance : "잔액 1100 마블",
    date
  },
  {
    img: "https://picsum.photos/61/62",
    amount: "-1000 마블",
    transcation: "토니토니",
    balance : "잔액 100 마블",
    date
  }
]


function DonationList() {
  return (
    <>
      {/* 필터링 */}
      {/* 날짜필터링 */} 
      {
        DonationDataList.map((data) => {
          return (
            <>
              <hr/>
              <DonationListItem data={data} />
            </>
          )
        })
      }
    </>
  );
};

export default DonationList;

