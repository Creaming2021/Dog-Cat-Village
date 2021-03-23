import React, { useState } from "react";
import Nav from "../../../nav/nav";
import Animal from "../animal/animal";
import Chatting from "../chatting/chatting";
import Donation from "../donation/donation";
import Home from "../home/home";
import MainCategory from "../mainCategory/mainCategory";
import styles from "./subMain.module.css";

const SubMain = () => {
  type CategoryType =
    | "home"
    | "notice"
    | "board"
    | "animal"
    | "chatting"
    | "donation";

  const [category, setCategory] = useState<CategoryType>("animal");

  const onChangeCategory = (category: CategoryType): void => {
    setCategory(category);
  };

  return (
    <div className={styles["sub-main"]}>
      <Nav name="centerMainPage" />
      <MainCategory onChangeCategory={onChangeCategory} />
      {category === "home" && <Home type="user" />}
      {category === "animal" && <Animal type="center" />}
      {category === "chatting" && <Chatting />}
      {category === "donation" && <Donation />}
    </div>
  );
};

export default SubMain;
