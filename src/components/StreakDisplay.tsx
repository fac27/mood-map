"use client"

import { getStreaks } from "../utils/getStreaks";
import { FC, useEffect, useState } from "react";
import { josefinSans } from "../utils/fonts";
import styles from "./StreakDisplay.module.css";
import flameIcon from "public/images/flame.svg";
import Image from "next/image";

interface StreakDisplayProps {
  today: Date;
  userId: string;
}

const StreakDisplay: FC<StreakDisplayProps> = ({ today, userId }) => {
  const [streakData, setStreakData] = useState({ current: 0, allTime: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStreaks(today, userId);
      setStreakData(data);
    };

    fetchData();
  }, [today, userId]);

  return (
    <>
      <div className={`${styles.streakContainer} ${josefinSans.className}`}>
        <div className={styles.streakItem}>
          <Image src={flameIcon} width={30} height={30} alt={"flame icon"} />
          <p className={styles.streakNumber}>
            {streakData.current} day{streakData.current > 1 ? "s" : ""}
          </p>
          <p className={styles.streakHeading}>CURRENT STREAK</p>
        </div>

        <div className={styles.streakItem}>
          <Image src={flameIcon} width={30} height={30} alt={"flame icon"} />
          <p className={styles.streakNumber}>
            {streakData.allTime} day{streakData.allTime > 1 ? "s" : ""}
          </p>
          <p className={styles.streakHeading}>LONGEST STREAK</p>
        </div>
      </div>
    </>
  );
};

export default StreakDisplay;
