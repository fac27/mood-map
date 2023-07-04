import React from "react";
import Exit from "@/src/components/Exit";
import styles from "./Entry.module.css";

//may need to changeReact.FC but version 5.1 should be fine now?
const Entry: React.FC = () => {
  return (
    <>
      <div className={styles.modalContainer}>
        <Exit path={"/life-in-colour"} />

        <h1 className="dateHeader">
          {new Date().toLocaleDateString("en-UK", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
        <div className={styles.gridContainer}>
          <div className={`${styles.square} ${styles.gridItem1}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem2}`}>Good</p>

          <div className={`${styles.circle} ${styles.gridItem3}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem4}`}>myself</p>

          <div className={`${styles.circle} ${styles.gridItem5}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem6}`}>outside</p>
        </div>
      </div>
    </>
  );
};

export default Entry;
