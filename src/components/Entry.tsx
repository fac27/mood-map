import React, { ReactElement } from "react";
import styles from "./Entry.module.css";
import Vector from "../../public/images/Vector.svg";
import Image from "next/image";
import { FC } from "react";
interface ModalProps {
  onClose: () => void;
}

//may need to changeReact.FC but version 5.1 should be fine now?
const Entry: FC<ModalProps> = ({ onClose }): ReactElement => {
  return (
    <>
      <div className={styles.modalContainer}>
        {/* <Exit path={"/life-in-colour"} /> */}
        <span className={styles.exit} onClick={onClose}>
          <Image src={Vector} alt="exit" width={20} height={20} />
        </span>

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
