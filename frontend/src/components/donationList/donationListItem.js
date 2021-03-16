import React from 'react';
import styels from './donationListItem.module.css';

function DonationListItem({ data }) {
  return (
    <div>
      <img src={data.img} />
      <div>{data.amount}</div>
      <div>{data.transcation}</div>
      <div>{data.balance}</div>
      <div>{data.date}</div>
    </div>
  );
};


export default DonationListItem;