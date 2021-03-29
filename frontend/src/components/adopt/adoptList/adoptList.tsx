import React, { useState } from "react";
import styles from "./adoptList.module.css";
import { AdoptListType } from "../../../interface/adopt";

type AdoptListFormProps = {
  adopt: AdoptListType;
  type: string;
  onClick: (adoptId: number) => void;
};

const AdoptListForm = ({ adopt, type, onClick }: AdoptListFormProps) => {
  const { id, petName, name, createdDate, acceptStatus } = adopt;

  return (
    <tr onClick={() => onClick(id)}>
      <td>{id}</td>
      <td>
        {acceptStatus}/{petName}
      </td>
      {type === "shelter" && <td>{name}</td>}
      <td>{createdDate}</td>
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
              key={adopt.id}
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
