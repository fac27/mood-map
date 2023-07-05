"use client";

import { useState, useEffect } from "react";
import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import Entry from "@/components/Entry";
import { getDays } from "../../utils/dateHelpers";
// import {entries} from '@/lib/getEntries';
import getUserEntries from "@/lib/getEntries";

const Grid: FC = (): ReactElement =>  {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [entriesData, setEntriesData] = useState(null); // This will hold your entries once they're loaded

  useEffect(() => {
    // Fetch entries and set them to state once they're loaded
    getUserEntries().then(data => {
      setEntriesData(data);
    });
  }, []);

  const divDays = getDays(2023);

  return (
    <>
      <h1 className={styles.pageHeader}>My Life in Colour</h1>
      <div className={styles.pageContainer}>
        <div className={styles.grid}>
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div className={styles.grid}>
          {divDays.map((day: Date) => {
            const dateOfMonth = day.getDate();
            const firstDayOfWeek = new Date(
              day.getFullYear(),
              day.getMonth(),
              1
            ).getDay();
            let gridColumn = ((firstDayOfWeek + 6) % 7) + 1;

            if (dateOfMonth > 1) {
              gridColumn = ((gridColumn + dateOfMonth - 2) % 7) + 1;
            }
            return (
              <div
                className={styles.gridBox}
                style={{
                  gridColumn,
                }}
                key={day.toString()}
                onClick={openModal}
              ></div>
            );
          })}
        </div>
      </div>
      {isOpen && <Entry onClose={closeModal} entries={entriesData}/>}
    </>
  );
};

export default Grid;

