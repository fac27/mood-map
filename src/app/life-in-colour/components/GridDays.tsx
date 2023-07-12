"use client";

import { useState } from "react";
import { ReactElement, FC } from "react";
import styles from "../page.module.css";
import { getDaysInRange } from "@/utils/dateHelpers";
import { IEntry } from "@/types/types";
import Entry from "@/components/Entry";

const GridDays: FC<{ session: any; allEntries: IEntry[] }> = ({
  allEntries: entriesData,
  session,
}): ReactElement => {
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

  const getEntryById = (id: number, entries: IEntry[]): IEntry | null => {
    const entry = entries.find((entry) => entry.id === id);
    return entry ? entry : null;
  };

  const latestEntry = new Date(
    entriesData[entriesData.length - 1]["mood_date"]
  );
  const earliestEntry = new Date(entriesData[0]["mood_date"]);

  return entriesData.length === 0 ? (
    <div className={styles.information}>Loading...</div>
  ) : (
    <>
      {getDaysInRange(earliestEntry, latestEntry).map((day: Date) => {
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
            className={`${styles.gridBox}
            ${day.getMonth() % 2 === 1 ? styles.alternateMonth : ""}
            ${matchingEntry ? styles.gridPopulated : ""}`}
            style={{
              gridColumn,
              backgroundColor: matchingEntry
                ? `var(--color-${matchingEntry["mood"]})`
                : "var(--background-color))",
              color: matchingEntry
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
          >
            {matchingEntry ? `${day.getDate()}/${day.getMonth() + 1}` : ""}
          </div>
        );
      })}
      {isOpen && (
        <Entry onClose={closeModal} entry={entryClicked} session={session} />
      )}
    </>
  );
};

export default GridDays;
