import React, { useEffect, useState } from 'react';
import ShelterListPage from '../components/shelterListPage/shelterListPage';
import { security } from '../service/instance';

const ShelterListContainer = () => {
  const [shelterList, setShelterList]= useState([]);

  useEffect(() => {
    security.get('/shelters', {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }})
      .then((res) => {
        setShelterList(res.data.shelterList);
        // console.log(res);
      })
      .catch(() => {})
    },[]);
  return (
    <ShelterListPage shelterList={shelterList} />
  );
};

export default ShelterListContainer;