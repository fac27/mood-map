"use client";

import { useState, useEffect } from "react";
import { ReactElement, FC } from "react";
import styles from "./page.module.css";
import Entry from "@/components/Entry";
import { getDaysInRange } from "../../utils/dateHelpers";
import { getAllEntries } from "@/lib/models";
import { IEntry } from "@/types/types";
import Navbar from "@/components/Navbar";
import { protectBrowserRoute } from "@/lib/browser/session";

const Grid: FC = (): ReactElement => {
  const [entryClicked, setEntryClicked] = useState<IEntry | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    const id = e.currentTarget.id;
    if (id.includes("no-entry")) {
      setEntryClicked(null);
      setIsOpen(false);
      return;
    }

    setEntryClicked(getEntryById(+id, entriesData));
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const [entriesData, setEntriesData] = useState<IEntry[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const session = await protectBrowserRoute();
      getAllEntries(session.user.id).then((entries) => {
        // Sort entries by date
        const entriesSortedByDate = entries.sort((a, b) => {
          const dateA = new Date(a.mood_date);
          const dateB = new Date(b.mood_date);

          return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
        });
        setEntriesData(entriesSortedByDate);
      });
    };
    getUser();
  }, []);

  if (entriesData.length === 0) {
    return <div className={styles.information}>Loading...</div>;
  }

  const latestEntry = new Date(
    entriesData[entriesData.length - 1]["mood_date"]
  );
  const earliestEntry = new Date(entriesData[0]["mood_date"]);

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
            const matchingEntry = (entriesData as []).find((entry) => {
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
                  backgroundColor: matchingEntry
                    ? `var(--color-${matchingEntry["mood"]})`
                    : "var(--background-color))",
                }}
                id={
                  matchingEntry
                    ? matchingEntry["id"]
                    : `no-entry-${day.toDateString()}`
                }
                key={day.toString()}
                data-testid="myDiv"
                onClick={openModal}
              >{`${day.getDate()}/${day.getMonth() + 1}`}</div>
            );
          })}
        </div>
      </div>
      <Navbar />
      {isOpen && <Entry onClose={closeModal} entry={entryClicked} />}
    </>
  );
};

const getEntryById = (id: number, entries: IEntry[]): IEntry | null => {
  const entry = entries.find((entry) => entry.id === id);
  if (entry) {
    return entry;
  }
  return null;
};

export default Grid;
