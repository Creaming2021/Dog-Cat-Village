import React, { useEffect, useState } from 'react';
import styles from './donatedShelterList.module.css';
import DonatedShelterItem from './donatedShelterItem';
import { TransactionListType } from '../../interface/blockchain';
import { DonatedShelterType } from '../../interface/shelter';

type DonatedShelterListProps = {
  transactionList: TransactionListType[]
}

const DonatedShelterList = ({ transactionList }: DonatedShelterListProps) => {
  const [choicedList, setChoicedList] = useState(true);
  const [donatedShelterList, setDonatedShelterList] = useState<DonatedShelterType[]>([]);
  const [selectedShelter, setSelectedShelter] = useState<string[]>([]);

  useEffect(() => {
    // transactionList.map( transaction => {
    //   var name: string = transaction.toName;
    //   if(!selectedShelter.includes(name)){
    //     setSelectedShelter({ ...selectedShelter, name });
    //   }
    // });

    transactionList.map( transaction => {
      setDonatedShelterList(
        donatedShelterList.concat(
          {
            profileImage: transaction.toProfileImage,
            name: transaction.toName,
            time: transaction.time,
            value: transaction.value,
          })
      );
    });
  }, []);

  const btnActiveController = () => {
    setChoicedList(!choicedList);
  }

  return (
    <>
      <div className={styles['list-out-container']}>
        <div className={styles['btn-container']}>
          <button 
            className={`${styles['tab-btn']} ${choicedList && styles['btn-active']}`}
            onClick={btnActiveController}
          >
            후원한 보호소
          </button>
          <button 
            className={`${styles['tab-btn']} ${!choicedList && styles['btn-active']}`}
            onClick={btnActiveController}
          >
            입양 신청
          </button>
        </div>
        <div className={styles['list-container']}>
          { donatedShelterList.map((shelter) => 
              <DonatedShelterItem shelter={shelter} />
            )
          }
        </div>
      </div>
    </>
  );
};

export default DonatedShelterList;