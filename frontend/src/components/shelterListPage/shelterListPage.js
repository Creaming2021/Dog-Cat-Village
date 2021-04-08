import React, { useEffect, useState } from 'react';
import ShelterListItem from './shelterListItem';
import styles from './shelterListPage.module.css';
import { Search } from '../common/common';
import Nav from '../nav/nav';
import { useHistory } from 'react-router';

const ShelterListPage = ({ shelterList }) => {
  const [values, setValues] = useState({ first: 'shelterName', input: '' });
  const [filteredList, setFilteredList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const history = useHistory();

  useEffect(() => {
    setFilteredList(shelterList);
  },[shelterList]);

  const searchHandler = () => {
    // console.log(searchKeyword);
    setFilteredList(shelterList.filter(data => data.name.includes(searchKeyword)));
  };

  const searchSelectList = [{ 
    name: 'type', 
    options: [{ value: "shelterName", option: "보호소 이름"}]
  }];

  const moveShelterMainPage = (id) => {
    // 해당 보호소 메인페이지로 이동
    history.push(`/${id}`)
  };

  return (
    <div className={styles['shelter-list-container']}>
      <div className={styles['upper-container']}>
        <Nav role={'CONSUMER'} />
      </div>
      <div className={styles['search-container']}>
        <Search
          selectList={searchSelectList}
          selectValue={values.first}
          inputValue={searchKeyword}
          inputName={'keyword'}
          onSearch={searchHandler}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
          placeholder={'검색어'}
          inputSize={'input-medium'}
        />
      </div>
      <div className={styles['main-container']}>
        {
          filteredList.map((data) => {
            return (
              <div 
                className={styles['shelter-item-container']} 
                key={data.email} >
                  <ShelterListItem 
                    data={data}
                    onClick={moveShelterMainPage} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default ShelterListPage;