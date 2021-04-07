import React, { useEffect, useState } from 'react';
import styles from './donatedShelterList.module.css';
import DonatedShelterItem from './donatedShelterItem';
import { TransactionListType } from '../../interface/blockchain';
import { DonatedShelterType } from '../../interface/shelter';
import AdoptContainer from '../../containers/adoptContainer';

type DonatedShelterListProps = {
  transactionList: TransactionListType[]
}

const DonatedShelterList = ({ transactionList }: DonatedShelterListProps) => {
  const [view, setView] = useState('shelter');
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

  const onChangeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    setView(value);
  }

  return (
    <div className={styles['list-out-container']}>
      <div className={styles['btn-container']}>
        <button 
          className={`${styles['tab-btn']} ${view === 'shelter' && styles['btn-active']}`}
          value="shelter"
          onClick={onChangeButton}
        >
          후원한 보호소
        </button>
        <button 
          className={`${styles['tab-btn']} ${view === 'adopt' && styles['btn-active']}`}
          value="adopt"
          onClick={onChangeButton}
        >
          입양 신청
        </button>
      </div>
      { view === 'shelter' &&
        <div className={styles['list-container']}>
          { donatedShelterList.map((shelter) => 
            <DonatedShelterItem shelter={shelter} />
            )
          }
        </div>
      }
      { view === 'adopt' && <AdoptContainer/>}
    </div>
  );
};

export default DonatedShelterList;