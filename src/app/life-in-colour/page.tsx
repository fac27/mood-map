"use client";

import { useState, useEffect } from "react";
import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import Entry from "@/components/Entry";
import { getDays, getDaysInRange } from "../../utils/dateHelpers";
// import {entries} from '@/lib/getEntries';
import getUserEntries from "@/lib/getEntries";

interface Entry {
  mood: number;
  mood_date: string;
  journal_entry: string;
  context_people: string;
  context_location: string;
}

const Grid: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [entriesData, setEntriesData] = useState<Entry[]>([]);

  useEffect(() => {
    getUserEntries().then((entries) => {
      // Sort entries by date
      const entriesSortedByDate = entries.sort((a, b) => {
        const dateA = new Date(a.mood_date);
        const dateB = new Date(b.mood_date);

        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
      setEntriesData(entriesSortedByDate);
    });
  }, []);

  if (entriesData.length === 0) {
    return <div className={styles.information}>Loading...</div>;
  }

  const latestEntry = new Date(
    entriesData[entriesData.length - 1]["mood_date"]
  );
  const earliestEntry = new Date(entriesData[0]["mood_date"]);

  console.log(`latestEntry: ${latestEntry}`);
  console.log(`earliestEntry: ${earliestEntry}`);

  const divDays = getDaysInRange(earliestEntry, latestEntry);

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
            const getMatchingEntry = (entriesData as []).find((entry) => {
              const entryDate = new Date(entry["mood_date"]);
              return (
                entryDate.getDate() === day.getDate() &&
                entryDate.getMonth() === day.getMonth() &&
                entryDate.getFullYear() === day.getFullYear()
              );
            });

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
                  backgroundColor: getMatchingEntry
                    ? `var(--color-${getMatchingEntry["mood"]})`
                    : "var(--background-color))",
                }}
                key={day.toString()}
                data-testid="myDiv"
                onClick={openModal}
              >{`${day.getDate()}/${day.getMonth() + 1}`}</div>
            );
          })}
        </div>
      </div>
      {/*isOpen && <Entry onClose={closeModal} entries={entriesData} />*/}
    </>
  );
};

export default Grid;
