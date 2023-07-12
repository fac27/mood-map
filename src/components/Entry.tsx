"use client";

import React, { ReactElement, useEffect, useState } from "react";
import styles from "./Entry.module.css";
import Vector from "@/../public/images/Vector.svg";
import Image from "next/image";
import { FC } from "react";
import { IEntry } from "@/types/types";
import { Player } from "./SpotifyPlayer";
import getRecentlyPlayedSong from "@/utils/spotifyHelper";
interface ModalProps {
  onClose: () => void;
  entry: IEntry | null;
  session: any;
}

//may need to changeReact.FC but version 5.1 should be fine now?
const Entry: FC<ModalProps> = ({ onClose, entry, session }): ReactElement => {
  const [href, setHref] = useState("");

  useEffect(() => {
    async function getSong() {
      const recentSong = await getRecentlyPlayedSong(
        session,
        entry?.mood_date as string,
        1
      );
      setHref(recentSong.href);
    }
    getSong();
  }, [entry]);

  if (!entry) {
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
          {new Date(entry.mood_date).toLocaleDateString("en-UK", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
        <div className={styles.gridContainer}>
          <div
            className={`${styles.square} ${styles.gridItem1}`}
            style={{ backgroundColor: `var(--color-${entry.mood})` }}
          ></div>
          <p className={`${styles.gridText} ${styles.gridItem2}`}>Mood</p>

          <div className={`${styles.circle} ${styles.gridItem3}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem4}`}>
            {entry.context_people === "Alone"
              ? "You were alone"
              : `You were with ${entry.context_people}`}
          </p>

          <div className={`${styles.circle} ${styles.gridItem5}`}></div>
          <p className={`${styles.gridText} ${styles.gridItem6}`}>
            Location: {entry.context_location}
          </p>

          <div className={`${styles.circle} ${styles.gridItem7}`}></div>
          <p className={`${styles.gridText}`}>
            {entry.journal_entry
              ? `Journal entry: ${entry.journal_entry}`
              : "No journal entry recorded"}
          </p>
        </div>
        <Player href={href} />
      </div>
    </>
  );
};

export default Entry;
