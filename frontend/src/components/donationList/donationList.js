import React, { useEffect, useState } from 'react';
import styles from './donationList.module.css';
import DonationListItem from './donationListItem';

const DonationList = ({ dataList, userTypeBoolean }) => {
  const [ moreBtnState, setMoreBtnState ] = useState(false);
  const [ values, setValues ] = useState({ type: 'all', input: '' });
  const [ donationDataList, setDonationDataList ] = useState([]);
  const [ changeArray, setChangeArray ] = useState([]);

  useEffect(() => {
    setDonationDataList([...dataList]);
  }, [dataList]);

  useEffect(() => {
    // console.log(donationDataList);
    setChangeArray(Array.from(donationDataList));
  }, [donationDataList]);

  const controlMoreBtn = () => {
    setMoreBtnState(!moreBtnState);
    // console.log(moreBtnState);
  };

  return (
    <>
      <div className={styles['donation-container']}>
        <div className={styles['search-container']}>
          {/* <Search 
            selectList={[{name: 'type', options: [
              { value: "all", option: "모두" },
              { value: "charge", option: "충전" },
              { value: "donate", option: "기부" }
            ]}]}
            selectValue={[values.first]} 
            inputValue={values.input}
            inputName={'shelterInput'} 
            onSearch={()=>{
            }}
            onChange={(e) => {
            }}
            placeholder={'보호소 명'}
            inputSize={'input-large'}
          /> */}
        </div>
        <div className={styles['main-container']}>
          {/* <div className={styles['date-filter']}>
            <button className={`${styles['left-btn']} ${!userTypeBoolean && styles['blue-btn']}`}>◀</button>
            <p className={styles.date}>2021.03</p>
            <button className={`${styles['right-btn']} ${!userTypeBoolean && styles['blue-btn']}`}>▶</button>
          </div> */}
          <div className={ moreBtnState === true 
                          ? `${styles['list-container']} ${styles['list-container-active']}` 
                          : styles['list-container']}>
            { changeArray
              ? changeArray.map((data, index) => {
                  return (
                    <div key={index}>
                      <hr className={styles['list-line']}/>
                      <DonationListItem data={data} key={data.id} />
                    </div>
                  )
                })
              : <div className={styles.comment}>거래 기록이 없습니다.</div>
            }
          </div>
          {/* <div className=  */}
        </div>
      </div>
    </>
  );
};

export default DonationList;

