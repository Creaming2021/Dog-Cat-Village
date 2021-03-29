import React from "react";
import styles from "./nav.module.css";

type NavProps = {
  name: String;
};

const Nav = ({ name }: NavProps) => {
  return <div className={styles.nav}></div>;
};

export default Nav;
