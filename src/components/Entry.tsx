import React, { ReactElement } from "react";
import styles from "./Entry.module.css";
import Vector from "../../public/images/Vector.svg";
import Image from "next/image";
import { FC } from "react";
// import entries from "@/lib/getEntries"

interface UserEntryTable {
  id: number; // bigint is treated as number in TypeScript
  created_at: Date; // timestamp with timezone can be represented with Date
  mood: number; // smallint is a number
  mood_date: Date; // date can be represented with Date
  journal_entry: string; 
  context_people: string; 
  context_location: string; 
  user_id: string; // uuid is a string in JavaScript/TypeScript
}

interface ModalProps {
  onClose: () => void;
  entries: UserEntryTable | null;
}

//may need to changeReact.FC but version 5.1 should be fine now?
const Entry: FC<ModalProps> = ({ onClose, entries }): ReactElement => {
console.log(entries)
if (!entries) {
  return <div>No entries available.</div>; // Replace with your own placeholder
}
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
          <p className={`${styles.gridText} ${styles.gridItem2}`}>{entries.mood}</p>

          <div className={`${styles.circle} ${styles.gridItem3}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem4}`}>{entries.context_people}</p>

          <div className={`${styles.circle} ${styles.gridItem5}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem6}`}>{entries.context_location}</p>
        </div>
      </div>
    </>
  );
};

export default Entry;
