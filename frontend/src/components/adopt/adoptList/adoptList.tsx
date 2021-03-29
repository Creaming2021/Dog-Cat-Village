import React, { useState } from "react";
import styles from "./adoptList.module.css";
import { AdoptListType } from "../../../interface/adopt";

type AdoptListFormProps = {
  adopt: AdoptListType;
  type: string;
  onClick: (adoptId: number) => void;
};

const AdoptListForm = ({ adopt, type, onClick }: AdoptListFormProps) => {
  const { adoptId, petName, userName, createdAt, acceptStatus } = adopt;

  return (
    <tr onClick={() => onClick(adoptId)}>
      <td>{adoptId}</td>
      <td>
        {acceptStatus}/{petName}
      </td>
      {type === "shelter" && <td>{userName}</td>}
      <td>{createdAt}</td>
    </tr>
  );
};

type AdoptListProps = {
  adoptList: AdoptListType[];
  type: string;
  onClick: (adoptId: number) => void;
};

const AdoptList = ({ adoptList, type, onClick }: AdoptListProps) => {
  return (
    <>
      <table className={styles["adopt-list-container"]}>
        <thead className={styles["list-header"]}>
          <tr>
            <th>No</th>
            <th>Animal Name</th>
            {type === "shelter" && <th>User Name</th>}
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {adoptList.map((adopt) => (
            <AdoptListForm
              key={adopt.adoptId}
              adopt={adopt}
              type={type}
              onClick={onClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdoptList;
